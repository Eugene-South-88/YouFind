<template>
  <div class="video-list">
    <VideoCard
        v-if="videos.length !== 0"
        v-for="video in videos"
        :key="video.id"
        :video="video"
        @toggle-favorite="store.toggleFavorite"
    />
    <div v-else class="empty-block">
      <h2>Видео отсутствуют, попробуйте ещё раз.</h2>
      <button class="reload-btn"
              @click="store.fetchVideos('', 'relevance');"
      >
        Загрузить
      </button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import VideoCard from './VideoCard.vue';
import { useVideoStore } from '../store/videoStore';
import type {VideoDetailsItem} from "../types/types.ts";


defineProps<{ videos: VideoDetailsItem[] }>();
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
    padding: 1rem;
  }
}

.empty-block {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.reload-btn {
  margin-top: 1rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.reload-btn:hover {
  background-color: #2563eb;
}

</style>

