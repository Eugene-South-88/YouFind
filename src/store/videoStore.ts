import { defineStore } from 'pinia';
import { searchVideos } from "../api/youtube.ts";
import type { VideoDetailsItem } from "../types/types.ts";

export const useVideoStore = defineStore('video', {
    state: () => ({
        videos: [] as VideoDetailsItem[],
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as VideoDetailsItem[],
        loading: false,
        error: '',
        nextPageToken: undefined as string | undefined,
    }),
    actions: {
        async fetchVideos(query: string, filter = '', pageToken = '') {
            this.loading = true;
            this.error = '';
            try {
                const { items, nextPageToken } = await searchVideos(query, pageToken, filter);
                this.videos = pageToken ? [...this.videos, ...items] : items;
                this.nextPageToken = nextPageToken;
            } catch (err: unknown) {
                if (err instanceof Error) {
                    this.error = err.message;
                } else {
                    this.error = 'Ошибка при загрузке видео';
                }
            } finally {
                this.loading = false;
            }
        },
        toggleFavorite(video: VideoDetailsItem) {
            const index = this.favorites.findIndex(v => v.id === video.id);
            if (index >= 0) this.favorites.splice(index, 1);
            else this.favorites.push(video);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        }
    }
});
