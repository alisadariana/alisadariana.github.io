import { parse as parseYAML } from 'yaml';

export interface Tutorial {
  title: string;
  description: string;
  tags: string[];
  date: string;
  author: string;
  slug: string;
  content?: string;
  category?: string;
}

export interface TutorialFrontmatter {
  title: string;
  description: string;
  tags: string[];
  date: string;
  author: string;
  slug: string;
}

const CONTENT_BASE_URL = 'https://raw.githubusercontent.com/alisadariana/tutorials-content/main';

export async function fetchTutorials(): Promise<Tutorial[]> {
  try {
    const response = await fetch(`${CONTENT_BASE_URL}/meta.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tutorials: ${response.statusText}`);
    }
    const data = await response.json();
    return data.tutorials; // meta.json contains { tutorials: Tutorial[] }
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    throw error;
  }
}

export async function fetchTutorialContent(
  slug: string
): Promise<{ content: string; metadata: TutorialFrontmatter }> {
  try {
    const path = slug.replace(/-/g, '/');
    const response = await fetch(`${CONTENT_BASE_URL}/tutorials/${path}.md`);
    if (!response.ok) {
      throw new Error(`Failed to fetch tutorial content: ${response.statusText}`);
    }
    const text = await response.text();

    // Parse frontmatter
    const matches = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!matches) {
      throw new Error('Invalid markdown format: No frontmatter found');
    }

    const [, frontmatter, content] = matches;
    const metadata = parseYAML(frontmatter) as TutorialFrontmatter;

    return { content, metadata };
  } catch (error) {
    console.error(`Error fetching tutorial content for ${slug}:`, error);
    throw error;
  }
}
