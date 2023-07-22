/**
 * Boilerplate for v-model
 */
export default {
  props: {
    /** Input Value to be used for v-model */
    value: { default: null },
  },

  computed: {
    /**
     * Watches the value prop and convert value to string if array or object
     * so it can be used to watch on change
     * @returns {*}
     */
    _valueDataHandler() {
      const isObject = typeof this.value === 'object';
      const isArray = Array.isArray(this.value);
      if (isObject || isArray) {
        return JSON.stringify(this.value);
      } else {
        return this.value;
      }
    },
  },

  methods: {
    /**
     * Handles the input event of an input element
     * @param {HtmlInputEvent} e 
     * @param {*} fallbackValue - value to be displayed if input event is missing 
     */
    handleInputEvent(e, fallbackValue = null) {
      const value = e?.target?.value || fallbackValue;
      this.$emit('input', value);
    },
  }
};