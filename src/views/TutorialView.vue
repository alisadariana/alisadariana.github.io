<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import { fetchTutorials, type Tutorial } from '../api/tutorial';

  const tutorials = ref<Tutorial[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      tutorials.value = await fetchTutorials();
    } catch (e) {
      error.value = 'Failed to load tutorials';
      console.error(e);
    } finally {
      loading.value = false;
    }
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
</script>

<template>
  <div class="space-y-8">
    <header class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-text">Tutorials</h1>
      <p class="text-text-secondary max-w-2xl mx-auto">Dump of everything I learn to do.</p>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-pulse space-y-4">
        <div class="h-4 bg-border rounded w-3/4 mx-auto"></div>
        <div class="h-4 bg-border rounded w-1/2 mx-auto"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 text-status-error">
      {{ error }}
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RouterLink
        v-for="tutorial in tutorials"
        :key="tutorial.slug"
        :to="{ name: 'tutorial-details', params: { slug: tutorial.slug } }"
        class="block"
      >
        <article
          class="group bg-background rounded-lg border border-border p-6 hover:border-primary-light transition-colors duration-200 h-full"
        >
          <div class="space-y-4">
            <h2
              class="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-200"
            >
              {{ tutorial.title }}
            </h2>

            <p class="text-text-secondary text-sm line-clamp-2">
              {{ tutorial.description }}
            </p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in tutorial.tags"
                :key="tag"
                class="px-2 py-1 text-xs rounded-md bg-background-darker text-text-secondary"
              >
                {{ tag }}
              </span>
            </div>

            <time :datetime="tutorial.date" class="block text-xs text-text-light">
              {{ formatDate(tutorial.date) }}
            </time>
          </div>
        </article>
      </RouterLink>
    </div>
  </div>
</template>
