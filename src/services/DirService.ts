import axios from "axios";

export interface Directory {
    dirId: number;
    name: string;
}

export interface RootDirsGetAll {
    dirs: Directory[];
}

export interface DirectoryContent {
    dirs: Directory[]
}

const apiClient = axios.create({
    baseURL: "http://localhost:8022/api",
});

export const DirService = {
    async getRootDirs(): Promise<RootDirsGetAll> {
        const response = await apiClient.get('/roots');
        return response.data as RootDirsGetAll;
    },
    async getDirContent(dirId: number): Promise<DirectoryContent> {
        const response = await apiClient.get('/dirs/' + dirId + '/content');
        return response.data as DirectoryContent;
    },
};