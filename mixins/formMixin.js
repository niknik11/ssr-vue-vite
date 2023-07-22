import { parseValidationString } from '@helpers/validationHelper';

/***********************************************************
 * CHILD INPUT MIXIN
 * Use this mixin for form inputs 
 ************************************************************/
export default {
  // injectable provider value from form validation
  inject: {
    validation: {
      default: false,
    },
    form: {
      default: false,
    },
  },

  props: {
    /** Name of the input (optional) */
    name: { type: String, default: '' },
    /** Label of the input component */
    label: { type: String, default: '' },
    /** Flag to disable the input component */
    disabled: { type: Boolean, default: false },
    /** Default input placeholder */
    placeholder: { type: String, default: '' },
    /** Icon name to be prepended (Based on projects current icon library) */
    prependIcon: { type: String, default: '' },
    /** Icon name to be appended (Based on projects current icon library) */
    appendIcon: { type: String, default: '' },
    /** Color to be used on the input (Based on project's current css library) */
    color: { type: String, default: null },
    /** Color to be used on the prepend/append icon (Based on project's current css library) */
    iconColor: { type: String, default: 'gray' },
    /** Class to be appended to the input label */
    labelClass: { type: String, default: '' },
    /** Classes to be appended to the input container */
    containerClass: { type: String, default: '' },
    /** Classes to be appended to the input itself */
    inputClass: { type: String, default: '' },    
    /** Hide the entire error element */
    hideError: { type: Boolean, default: false },
    /** Removes the label tag to the component */
    hideLabel: { type: Boolean, default: false },
    /** List of validations to be used on the input.
     * Can be of the following: 
     *  -array of function
     *  -text of predefined validation (See validationHelper.js)
     *  - Comination of both with the text included in the array
    */
    validations: { type: [Array, String], default: () => [] },
    //** (Deprecated) Use to activate component validation */
    validate: { type: [Number, String, Boolean], default: false },
    //** Excludes this component from form validation */
    skipValidation: { type: Boolean, default: false },
  },

  data() {
    return {
      error: ' ',
      validForValidation: false,
      selfValidated: true,
    };
  },

  computed: {
    /**
     * Returns the component color or the form color or a default state
     * @return {String} 
     */
    formColor() {
      return this.color || this.form.color || 'primary';
    },
    /**
     * Flag if component is eligible for form validation
     * @return {Boolean} 
     */
    hasFormValidator() { 
      return !!this.validation && !this.skipValidation;
    },
    /**
     * Flag if component was given a validation prop
     * @return {Boolean} 
     */
    hasValidation() {
      return this.validations && this.validations.length > 0;
    },
    /**
     * Flag that checks if component has a required validation
     * @return {Boolean} 
     */
    isRequired() {
      if (typeof this.validations === "string") {
        const validations = this.validations.split("|").map(val=>val.trim());
        return validations.includes("required");
      } else if (Array.isArray(this.validations)) {
        return (
          this.validations.filter((rule) => {
            if (!rule) {
              return false;
            } else if (typeof rule === 'string') {
              if (rule.includes('required')) {
                return true;  
              }
            } else if (typeof rule() === 'function') {
              let innerRule = rule('');
              return innerRule('').toString().includes("shouldn't be empty.");
            } 
            else {
              return rule('').toString().includes("shouldn't be empty.");
            }
          }).length > 0
        );
      } else {
        return false;
      }
    },
    /**
     * Returns all the validation functions to be used on check
     * @returns {Array}
     */
    validationList() {
      // from string
      if (typeof this.validations === "string") {
        return parseValidationString(this.validations);
      // from array
      } else if (Array.isArray(this.validations)) {
        const stringValidations = this.validations
          .find(validationItem => typeof validationItem === 'string');
        const parsedValidations = 
          stringValidations ? parseValidationString(stringValidations) : [];
        const validations = this.validations
          .filter(validationItem=>typeof validationItem !== 'string');
        return [ ...validations, ...parsedValidations ];
      // from null or wrong type
      } else {
        return [];
      }
    },
  },

  watch: {
    validations: {
      handler(validations) {
        if (validations && validations.length > 0) {
          this.addToFormValidation();
        } else {
          this.addToFormValidation(false);
        }
      },
      deep: true,
    },
    'validation.form_key': {
      handler() {
        if (this.hasValidation) {
          this.selfValidated = false;
          this.validateInput();
        }
      },
    },
    focus(value) {
      if (!value && this.hasValidation) {
        this.selfValidated = true;
        this.validateInput();
      }
    },
  },

  methods: {
    /**
     * Add/Remove the component from the form validation run
     * @param {Boolean} flag 
     */
    addToFormValidation(flag = true) {
      if (flag) {
        if (!this.validForValidation) {
          this.validation.addFormInput && this.validation.addFormInput();
          this.validForValidation = true; 
        }
      } else {
        if (this.validForValidation) {
          this.validation.removeFormInput && this.validation.removeFormInput();
          this.validForValidation = false;
          this.error = null;
        }
      }
    },
    /**
     * Run the component's validations
     */
    validateInput() {
      let error = this.hasError(this.value);
      
      this.error = error !== false ? error : '';
      this.$emit('error', this.error);
      if (this.hasFormValidator && error) {
          const err_format = {name: this.name || this.label, error};
          this.validation.addError(err_format);
          if (this.validation.errors.length === 1) {
            // scroll to element
            setTimeout(() => {
              this.$el && this.$el.scrollIntoView({ block: 'center', behavior: 'smooth'});
            }, 200);
          }
      }
      if (this.hasFormValidator) {
        if (!this.selfValidated) {
          this.validation.addValidatedInput();
        } else {
          this.selfValidated = false;
        }
      }
    },
    /**
     * Check whether the provided value has error 
     * based on the component's validation list
     * @param {*} value 
     * @returns {Boolean|String} - Returns true of valid and the error string if not
     */
    hasError(value) {
      const rules = this.validationList;
      
      for (const rule of rules) {
        let validate = false;
        if (typeof rule() === 'function') {
          let innerRule = rule();
          validate = this.name ? innerRule(value, this.name) : innerRule(value);
        } else {
          validate = this.name ? rule(value, this.name) : rule(value);
        }
        if (validate !== true) {
          return validate;
        }
      }

      return false;
    },
  },

  mounted() {
    if (this.hasFormValidator && this.hasValidation) {
      this.addToFormValidation();
    }
  },
  destroyed() {
    if (this.hasFormValidator && this.hasValidation) {
      this.addToFormValidation(false);
    }
  },
};



/***********************************************************
 * PARENT FORM MIXIN
 * Use this mixin for the Form wrapper in conjunction with the above mixin
 ************************************************************/
export const baseFormMixin = {
  provide() {
    const _validation = {};
    // make the data provided as dynamic (as long as passed as object)
    Object.defineProperty(_validation, "form_key", {
        enumerable: true,
        get: () => this.form_key,
    });
    // make the data provided as dynamic (as long as passed as object)
    Object.defineProperty(_validation, "errors", {
      enumerable: true,
      get: () => this.errors,
    });
    // commands for inputs
    _validation.addError = this.addError;
    _validation.addFormInput = this.addFormInput;
    _validation.removeFormInput = this.removeFormInput;
    _validation.addValidatedInput = this.addValidatedInput;

    const _form = {};
    
    Object.defineProperty(_form, 'color', {
      enumerable: true,
      get: () => this.color,
    })
    return { validation: _validation, form: _form };
  },

  props: {
    /** The default color of the form and its input components */
    color: { type: String, default: null },
  },

  data() {
    return {
      form_key: null,
      errors: [],
      inputCtr: 0,
      validatedCtr: 0,
      validationStarted: false,
    };
  },

  watch: {
    validatedCtr() {
      if (this.inputCtr === this.validatedCtr && this.validationStarted) {
        this.emitValidated();
        this.validationStarted = false;
      }
    },
    errors(errors) {
      this.$emit('error', errors);
    },
  },

  methods: {
    /**
     * Emits a custom validated event
     * @param {Array} errors - List of errors to be emitted 
     */
    emitValidated(errors = false) {
      this.$emit("validated", errors || this.errors);
    },
    /**
     * Restarts the form validation 
     * and triggers child input form validation if valid
     */
    startFormValidation() {
      this.errors = [];
      this.validatedCtr = 0;
      this.validationStarted = true;
      this.form_key = `form-key-${Math.random() * 10}`;
    },
    /**
     * Add to total input counter to be validated
     */
    addFormInput() {
      this.inputCtr += 1;
    },
    
    /**
     * Remove to total input counter to be validated
     */
    removeFormInput() {
      this.inputCtr -= 1;
    },
    
    /**
     * Add to input counter that have been validated
     */
    addValidatedInput() {
      this.validatedCtr += 1;
    },
    
    /**
     * Add error to the form component
     */
    addError(errors) {
      this.errors.push(errors);
    },
  },
};