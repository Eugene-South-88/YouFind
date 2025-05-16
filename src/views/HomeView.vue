<template>
  <div>
    <SearchBar />
    <div v-if="store.error">
      Ошибка: {{ store.error }}
    </div>
    <div v-if="store.loading && store.videos.length === 0">
      Загрузка...
    </div>

    <div v-else>
      <VideoList :videos="store.videos" />

      <div ref="loadTrigger" class="observer-trigger"></div>

      <div v-if="store.loading && store.nextPageToken" class="loading-indicator">
        Загрузка...
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import VideoList from '../components/VideoList.vue';
import { useVideoStore } from '../store/videoStore';

const store = useVideoStore();
const loadTrigger = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && store.nextPageToken && !store.loading) {
        store.fetchVideos(store.query, store.filter, store.nextPageToken);
      }
    },
    {
      threshold: 1.0,
    }
);

onMounted(() => {
  store.fetchVideos(store.query, store.filter); // инициализация

  watchEffect(() => {
    if (loadTrigger.value) {
      observer.observe(loadTrigger.value);
    }
  });
});

onUnmounted(() => {
  if (loadTrigger.value) {
    observer.unobserve(loadTrigger.value);
  }
});
</script>

<style scoped lang="scss">
.observer-trigger {
  height: 1px;
}
.loading-indicator {
  text-align: center;
  margin: 1rem 0;
  color: #888;
  font-size: 1rem;
}
</style>
