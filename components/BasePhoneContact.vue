<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: "text" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: null },
  label: { type: String, default: "" },
  required: { type: Boolean, default: false },
  errorMessage: { type: String, default: null },
});
const emits = defineEmits(["update:modelValue", "input"]);

const onInput = (event: any) => {
  emits("update:modelValue", event.target.value);
  emits("input");
};
const isNumber = (e: any) => {
  var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);
  if (!charStr.match(/^[0-9]+$/)) {
    e.preventDefault();
  } else {
    return true;
  }
};
</script>
<template>
  <div class="flex flex-col w-full mt-4 text-base">
    <label class="mb-1 text-sm" :for="label"
      >{{ label }} <span v-if="required" class="text-red-600"> *</span></label
    >
    <div class="flex join">
      <input
        value="+63"
        type="text"
        disabled
        :class="[
          'w-16 border border-[#D2D2D2] border-r-0 py-3 px-[15px] rounded-md rounded-r-none  text-base',
          { 'focus-visible:outline-red-500 border-red-500': errorMessage },
        ]" />

      <input
        :value="modelValue"
        :type="type"
        :name="label"
        @input="onInput"
        @keypress="isNumber"
        :class="[
          'w-full border border-[#D2D2D2] focus-visible:outline-[#046A38] py-3 px-[15px] rounded-md rounded-l-none text-base',
          { 'focus-visible:outline-red-500 border-red-500': errorMessage },
        ]" />
    </div>
    <p class="text-xs text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>
