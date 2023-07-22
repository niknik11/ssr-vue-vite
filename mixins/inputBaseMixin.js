import isEqual from 'lodash/isEqual';

export default {
  props: {
    value: {
      type: [String, Number, Array, Object, Boolean, Event],
      default: undefined,
    },
  },

  data() {
    return {
      innerVal: this.value,
    };
  },

  watch: {
    innerVal: {
      handler(newVal, oldVal) {
        // console.log(isEqual(newVal, oldVal));
        if (
          typeof newVal === 'object' ||
          Array.isArray(newVal) ||
          !isEqual(newVal, oldVal)
        ) {
          this.$emit('input', newVal);
        }
      },
      deep: true,
    },
    value: {
      handler(newVal, oldVal) {
        // console.log(isEqual(newVal, oldVal));
        if (!isEqual(newVal, oldVal) || !isEqual(newVal, this.innerVal)) {
          this.innerVal = newVal;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
