interface AbstractModel {
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
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