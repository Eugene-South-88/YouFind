<template>
  <div class="video-list">
    <VideoCard
        v-for="video in videos"
        :key="video.id"
        :video="video"
        @toggle-favorite="store.toggleFavorite"
    />
  </div>
</template>

<script lang="ts" setup>
import VideoCard from './VideoCard.vue';
import { useVideoStore } from '../store/videoStore';

interface video {
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  channelTitle: string;
  publishedAt: string;
}

defineProps<{ videos: video[] }>();
const store = useVideoStore();
</script>

<style scoped>
.video-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1rem 0;
}

@media (max-width: 1200px) {
  .video-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .video-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .video-list {
    grid-template-columns: 1fr;
  }
}

</style>

