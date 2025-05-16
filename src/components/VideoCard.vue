<template>
  <div class="video-card">
    <img :src="video.snippet.thumbnails.medium.url" alt="" />
    <div class="info">
      <h3>{{ video.snippet.title }}</h3>
      <p>Канал: {{ video.snippet.channelTitle }}</p>
      <p>Просмотры: {{ video.statistics?.viewCount }}</p>
      <button @click="$emit('toggle-favorite', video)">
        {{ isFavorite ? 'Удалить из избранного' : 'В избранное' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import { useVideoStore } from '../store/videoStore.ts';

const props = defineProps<{ video: any }>();
const store = useVideoStore();

const isFavorite = computed(() => store.favorites.some(v => v.id === props.video.id));
</script>

<style scoped lang="scss">
.video-card {
  display: flex;
  flex-direction: column;
  background-color: #1f1f1f;
  border-radius: 12px;
  overflow: hidden;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .info {
    padding: 0.75rem;

    h3 {
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
      display: -webkit-box;
      --webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      font-size: 0.875rem;
      color: #aaaaaa;
      margin: 0.2rem 0;
    }

    button {
      margin-top: 0.5rem;
      background: transparent;
      border: 1px solid #3ea6ff;
      color: #3ea6ff;
      padding: 0.4rem 0.8rem;
      border-radius: 6px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(62, 166, 255, 0.1);
      }
    }
  }
}
</style>

