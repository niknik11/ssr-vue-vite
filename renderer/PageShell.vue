<template>
  <div class="flex m-auto layout">
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
    @apply bg-[#28A745] text-white rounded-[5px] border border-[#28A745] hover:bg-[#28A745] normal-case font-medium;
  }
}
</style>
