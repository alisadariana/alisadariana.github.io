<template>
  <nav class="fixed top-0 z-50 w-full bg-background border-b border-border shadow-sm">
    <div class="max-w-container mx-auto px-8 py-4 flex justify-between items-center">
      <router-link
        to="/"
        class="flex items-center gap-2 text-2xl font-semibold text-primary hover:text-primary-dark transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="w-7 h-7">
          <!-- Background -->
          <rect width="32" height="32" rx="6" fill="currentColor" />

          <!-- Code brackets -->
          <path d="M12 8 L6 16 L12 24" stroke="#ffffff" stroke-width="2.5" fill="none" />
          <path d="M20 8 L26 16 L20 24" stroke="#ffffff" stroke-width="2.5" fill="none" />

          <!-- Slash representing coding -->
          <path d="M18 6 L14 26" stroke="#e5e7eb" stroke-width="2.5" fill="none" />
        </svg>
        <span>Alisa-Dariana</span>
      </router-link>

      <div class="flex gap-8">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="relative font-medium text-text-secondary hover:text-primary transition-colors duration-200 py-2 group"
        >
          {{ link.name }}
          <span
            class="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"
            :class="{ 'w-full': $route.path === link.path, 'w-0': $route.path !== link.path }"
          ></span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  interface NavLink {
    name: string;
    path: string;
  }

  const links: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];
</script>

<style lang="postcss">
  .router-link-active {
    @apply text-primary font-semibold;
  }
</style>
