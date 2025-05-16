import { defineStore } from 'pinia';
import {searchVideos} from "../api/youtube.ts";

export const useVideoStore = defineStore('video', {
    state: () => ({
        videos: [] as any[],
        favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as any[],
        loading: false,
        error: '',
        nextPageToken: '',
    }),
    actions: {
        async fetchVideos(query: string, filter = '', pageToken = '') {
            this.loading = true;
            this.error = '';
            try {
                const { items, nextPageToken } = await searchVideos(query, pageToken, filter);
                this.videos = pageToken ? [...this.videos, ...items] : items;
                this.nextPageToken = nextPageToken;
            } catch (err: any) {
                this.error = err.message || 'Ошибка при загрузке видео';
            } finally {
                this.loading = false;
            }
        },
        toggleFavorite(video: any) {
            const index = this.favorites.findIndex(v => v.id === video.id);
            if (index >= 0) this.favorites.splice(index, 1);
            else this.favorites.push(video);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        }
    }
});
