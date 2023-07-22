<template>
  <div class="layout flex m-auto">
    <div class="content min-h-[100vh] w-full">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Link from "./Link.vue";
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-[#046a38] text-white rounded-[5px] border border-[#046a38] hover:bg-[#046a38] normal-case font-medium;
  }
}
</style>
