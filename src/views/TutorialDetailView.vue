<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchTutorialContent, type TutorialFrontmatter } from '../api/tutorial';
  import { marked } from 'marked';

  const route = useRoute();
  const content = ref('');
  const metadata = ref<TutorialFrontmatter | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    const slug = route.params.slug as string;

    try {
      const { content: markdown, metadata: meta } = await fetchTutorialContent(slug);
      content.value = await marked.parse(markdown);
      metadata.value = meta;
    } catch (e) {
      error.value = 'Failed to load tutorial content';
      console.error(e);
    } finally {
      loading.value = false;
    }
  });

  const formatDate = (date: string | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse space-y-6">
      <div class="h-8 bg-border rounded w-3/4"></div>
      <div class="space-y-3">
        <div class="h-4 bg-border rounded w-full"></div>
        <div class="h-4 bg-border rounded w-5/6"></div>
        <div class="h-4 bg-border rounded w-4/6"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12 text-status-error">
      {{ error }}
    </div>

    <!-- Content with Metadata -->
    <article v-else>
      <!-- Metadata Header -->
      <header class="mb-8 pb-8 border-b border-border">
        <h1 class="text-3xl font-bold text-text mb-4">{{ metadata?.title }}</h1>
        <p class="text-text-secondary mb-4">{{ metadata?.description }}</p>

        <div class="flex items-center justify-between text-sm">
          <div class="flex items-center gap-2">
            <span class="text-text-light">By</span>
            <span class="text-text">{{ metadata?.author }}</span>
            <span class="text-text-light">•</span>
            <time :datetime="metadata?.date" class="text-text-light">
              {{ formatDate(metadata?.date) }}
            </time>
          </div>
          <div class="flex gap-2">
            <span
              v-for="tag in metadata?.tags"
              :key="tag"
              class="px-2 py-1 text-xs rounded-md bg-background-darker text-text-secondary"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- Tutorial Content -->
      <div class="prose prose-slate max-w-none">
        <div v-html="content"></div>
      </div>
    </article>
  </div>
</template>

<style lang="postcss">
  .prose {
    @apply text-text;
  }

  .prose h1 {
    @apply text-3xl font-bold mb-8 text-text;
  }

  .prose h2 {
    @apply text-2xl font-semibold mt-8 mb-4 text-text;
  }

  .prose p {
    @apply mb-4 text-text-secondary;
  }

  .prose code {
    @apply px-1.5 py-0.5 rounded bg-background-darker text-sm;
  }

  .prose pre {
    @apply p-4 rounded-lg bg-background-darker overflow-x-auto;
  }

  .prose pre code {
    @apply bg-transparent p-0;
  }

  .prose a {
    @apply text-primary hover:text-primary-dark transition-colors duration-200;
  }

  .prose ul {
    @apply list-disc list-inside space-y-2;
  }

  .prose ol {
    @apply list-decimal list-inside space-y-2;
  }
</style>
