export interface  Base <T> {
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
 export interface DTOManga{
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
  summary: string;
  imageUrl: string;
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
export interface GenreGetObject {
  genres:Genre[]
}