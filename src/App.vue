<script setup lang="ts">
  import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <main>
    <router-view />
  </main>
</template>

<style lang="postcss">
  body {
    margin: 0;
    padding: 0;
    @apply bg-background-alt text-text font-sans;
  }

  main {
    @apply mt-16 px-8 py-8 max-w-container mx-auto;
  }
</style>
