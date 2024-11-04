import { DTOManga, SelectedManga } from "./apiResponse";

interface AbstractModel {
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Author extends AbstractModel {
    _id: string;
    name: string;
}

export interface Publisher extends AbstractModel {
    _id: string;
    name: string;
    __v: number;
}

export interface Genre extends AbstractModel {
    _id: string;
    name: string;
    slug: string;
}

export interface Chapter extends AbstractModel {
    _id: string;
    manga: string,
    title: string,
    isDeleted: boolean,
    imageLinks: string[]
}

export interface Manga extends AbstractModel {
    _id: string;
    name: string;
    summary: string;
    imageUrl: string;
    author: [Author];
    publisher: Publisher;
    genres: [Genre];
    views: number;
    publish_date: Date;
    status: number;
    __v: number;
    followersCount: number;
    rating: number;
}

export interface Comment extends AbstractModel {
    _idComment: string;
    userName: string;
    text: string;
}

export interface MangaTableProps {
    openModal: () => void,
    setCurrentSelectedManga: React.Dispatch<React.SetStateAction<SelectedManga>>
    currentPage: number,
    totalPages: number,
    handlePageChange: (page: number) => void,
    rows: DTOManga[]
}