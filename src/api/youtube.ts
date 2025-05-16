import axios from 'axios';
import type {SearchResponse, VideoDetailsItem, VideoDetailsResponse} from "../types/types.ts";

const API_KEY = 'AIzaSyAt8orGkiTmSQ8-TqO3sceItLJXMO4MkSg';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (
    query: string,
    pageToken = '',
    filter = ''
): Promise<{ items: VideoDetailsItem[]; nextPageToken?: string }> => {
    const params: Record<string, string> = {
        key: API_KEY,
        part: 'snippet',
        q: query,
        maxResults: '10',
        type: 'video',
        order: filter || 'relevance',
    };

    if (pageToken) {
        params.pageToken = pageToken;
    }

    try {
        const response = await axios.get<SearchResponse>(`${BASE_URL}/search`, {params});

        const videoIds = response.data.items.map((item) => item.id.videoId).join(',');

        const details = await axios.get<VideoDetailsResponse>(`${BASE_URL}/videos`, {
            params: {
                key: API_KEY,
                part: 'snippet,statistics',
                id: videoIds,
            },
        });

        return {
            items: details.data.items,
            nextPageToken: response.data.nextPageToken,
        };
    } catch (error) {
        throw error;
    }
};
