export interface VideoId {
    videoId: string;
}

export interface SearchItem {
    id: VideoId;
}

export interface VideoSnippet {
    id: string;
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

export interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
    commentCount?: string;
}

export interface VideoDetailsItem {
    id: string;
    snippet: VideoSnippet;
    statistics: VideoStatistics;
}

export interface SearchResponse {
    items: SearchItem[];
    nextPageToken?: string;
}

export interface VideoDetailsResponse {
    items: VideoDetailsItem[];
}
