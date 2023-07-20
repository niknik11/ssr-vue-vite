<template>
  <div class="layout flex max-h-[900px] m-auto">
    <div class="navigation p-5 flex flex-col items-center leading-[1.8em]">
      <a href="/" class="logo mt-5 mb-[10px]">
        <img src="./logo.svg" height="64" width="64" alt="logo" />
      </a>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </div>
    <div
      class="content p-5 border-l-[2px] border-[#eee] min-h-[100vh] pb-[50px]">
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
</style>
