<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <div class="input-group">
        <input
            ref="inputRef"
            v-model="query"
            @keyup.enter="onSearch"
            placeholder="Введите запрос"
        />
        <button
            class="icon-button"
            @click="onSearch"
            title="Поиск"
            :disabled="store.loading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </button>
      </div>
      <select v-model="filter">
        <option value="relevance">По релевантности</option>
        <option value="date">По дате</option>
        <option value="viewCount">По просмотрам</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';
import { useVideoStore } from '../store/videoStore';

const query = ref('');
const filter = ref('relevance');
const store = useVideoStore();

const inputRef = ref<HTMLInputElement | null>(null);

const onSearch = () => {
  store.fetchVideos(query.value, filter.value);
};

onMounted(() => {
  inputRef.value?.focus();
});

watch(filter, () => {
  onSearch();
});
</script>

<style scoped lang="scss">
.search-bar-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.search-bar {
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: #0f0f0f;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.05);
}

.input-group {
  display: flex;
  flex: 1 1 auto;
  background-color: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;

  input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    background: transparent;
    color: white;
    border: none;
    outline: none;
    font-size: 1rem;

    &::placeholder {
      color: #888;
    }
  }

  .icon-button {
    padding: 0 1rem;
    background-color: #3ea6ff;
    border: none;
    color: #0f0f0f;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #1c85d0;
    }
  }
}

select {
  flex: 0 1 200px;
  padding: 0.6rem 0.8rem;
  background-color: #1f1f1f;
  color: white;
  border: 1px solid #333;
  border-radius: 8px;
  font-size: 1rem;
  appearance: none;
}

.icon-button:disabled {
  background-color: #555 !important;
  color: #999 !important;
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.6;
}

.icon-button:disabled:hover {
  background-color: #555 !important;
}

@media (max-width: 768px) {
  .search-bar {
    width: 90%;
    flex-direction: column;
    align-items: stretch;
  }

  select {
    width: 100%;
    padding: 0.4rem 0.6rem;
    font-size: 0.9rem;
    height: 2.5rem;
  }
}

</style>
