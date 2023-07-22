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
</script>
<template>
  <div class="flex flex-col w-full mt-4 text-base">
    <label class="mb-1 text-sm" :for="label"
      >{{ label }} <span v-if="required" class="text-red-600"> *</span></label
    >
    <!-- @change="onChange" -->
    <input
      :value="modelValue"
      :type="type"
      :name="label"
      @input="onInput"
      :class="[
        'w-full border border-[#D2D2D2] focus-visible:outline-[#046A38] py-3 px-[15px] rounded-md text-base',
        { 'focus-visible:outline-red-500 border-red-500': errorMessage },
      ]" />
    <p class="text-xs text-red-600">
      {{ errorMessage }}
    </p>
  </div>
</template>
