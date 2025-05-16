import axios from 'axios';

const API_KEY = 'AIzaSyB5MOGK4G6Mi0Z3KAD8ZVlEHLIxV0Lefro';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

interface VideoId {
    videoId: string;
}

interface SearchItem {
    id: VideoId;
}

interface VideoSnippet {
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

interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
    commentCount?: string;
}

interface VideoDetailsItem {
    id: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}

interface SearchResponse {
    items: SearchItem[];
    nextPageToken?: string;
}

interface VideoDetailsResponse {
    items: VideoDetailsItem[];
}

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

    // Добавляем pageToken только если он непустой
    if (pageToken) {
        params.pageToken = pageToken;
    }

    try {
        const response = await axios.get<SearchResponse>(`${BASE_URL}/search`, { params });

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
