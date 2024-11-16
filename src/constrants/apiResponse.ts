export interface Base<T> {
  message: string,
  data: T,

}
interface ApiResponse {
  message: string;
  data: Data;
}

interface Data {
  docs: Document[];
}
export interface User {
  _id: string;
  userName: string;
  email: string;
  isDeleted: boolean;
}

export interface Manga {
  _id: string
  name: string
  summary: string
  imageUrl: string
  author: Author[]
  publisher?: Publisher
  genres: Genre[]
  views: number
  isDeleted: boolean
  publish_date: string
  status: number
  createdAt: string
  updatedAt: string
  __v: number
  followersCount: number
  rating: number
}
export interface DTOManga {
  _id: string
  name: string
  summary: string
  imageUrl: string
  authorName: string[]
  genreName: string[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}
export interface DTOMangaCreate {
  _id: string;
  name: string;
  imageUrl: string;
  summary: string;
  authorName: string[];
  genreName: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  publish_date: string;
  publisher: string;
  status: number;
  views: number;
}

export interface MangaResponseData {
  docs: DTOManga[];
  totalPages: number;
}

export interface ChapterData {
  page: number;
  totalChapters: number;
  totalPages: number;
  chapters: Chapter[];
}

export interface Chapter {
  _id: string;
  title: string;
  chapterNum: number;
  updatedAt: Date;
  isDeleted: boolean;
}
export interface ChapterImage {
  chapterTitle: string;
  mangaName: string;
  arrayOfImage: string[][];
}

export interface Author {
  _id: string
  name: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface Publisher {
  _id: string
  name: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Genre {
  _id: string
  name: string
  slug: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface GetGenreResponse {
  page: number,
  totalGenres: number,
  totalPages: number,
  genres: GenrePair[]
};
export interface GenreResponse {
  page: number,
  totalGenres: number,
  totalPages: number,
  genres: Genre[]
};

export interface UpdateMangaData {
  _id: string;
  updatedData: {
    name?: string;
    summary?: string;
    imageUrl?: string;
    isDeleted?: boolean;
    genres?: string[];
  };
}

export interface GenrePair {
  _id: string,
  name: string
}

export interface IManga {
  _id: string
  name: string
  summary: string
  imageUrl: string
  author: string[]
  publisher: string
  genres: string[]
  views: number
  isDeleted: boolean
  publish_date: string
  status: number
}

export interface SelectedManga {
  _id: string
  name: string
  summary: string
  imageUrl: string
  author: string[]
  publisher: string
  genres: GenrePair[]
  views: number
  isDeleted: boolean
  status: number
}
export interface ImageData{
  _id: string
  imageLinks: string[]
}