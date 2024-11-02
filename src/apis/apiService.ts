// src/services/apiService.ts

import axios, { AxiosResponse } from 'axios';
import { Base, DTOManga, Genre, GenreGetObject, Manga, MangaResponseData, UpdateMangaData } from '../constrants/apiResponse';


const API_BASE_URL = 'https://researchdevzone.azurewebsites.net'; // Replace with your API base URL
interface QueryParams {
  [key: string]: string | number | undefined;
}
class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${API_BASE_URL}/${endpoint}`;
  }

  // Helper to build query parameters
  private buildQuery(params?: QueryParams): string {
    if (!params) return '';
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&');
    return queryString ? `?${queryString}` : '';
  }

  // Create a new resource
  async createUser(data: T, suffix?: string): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${this.endpoint}${suffix ? `/${suffix}` : ''}`, data);
  }

  // Read all resources
  async getAllUser(suffix?: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${this.endpoint}${suffix ? `/${suffix}` : ''}`);
  }

  // Read a single resource by ID
  async getUserById(id: string, suffix?: string): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${this.endpoint}/get-user-byid?id=${id}${suffix ? `/${suffix}` : ''}`);
  }

  // Update a resource by ID
  async updateUser(id: string, data: T, suffix?: string): Promise<AxiosResponse<T>> {
    return axios.put<T>(`${this.endpoint}/${id}${suffix ? `/${suffix}` : ''}`, data);
  }

  // Delete a resource by ID
  async deleteUser(id: string, suffix?: string): Promise<AxiosResponse<void>> {
    return axios.delete<void>(`${this.endpoint}/${id}${suffix ? `/${suffix}` : ''}`);
  }

  async getAllManga(params?: QueryParams): Promise<AxiosResponse<Base<MangaResponseData>>> {
    const query = this.buildQuery(params);
    const url = `${this.endpoint}${query}`;
    console.log(url); // Debug URL output
    return axios.get<Base<MangaResponseData>>(url);
  }
  // Update manga by ID
  async updateMangaById(data: UpdateMangaData): Promise<AxiosResponse<Base <DTOManga>>> {
    const url = `${this.endpoint}`;
    console.log('API URL for update:', url);
    return axios.put<Base <DTOManga>>(url, data);
  }

  // Get all genres with query parameters
  async getAllGenres(params?: QueryParams): Promise<AxiosResponse<Base<GenreGetObject>>> {
    const query = this.buildQuery(params);
    console.log(`${this.endpoint}${query}`);
    return axios.get<Base<GenreGetObject>>(`${this.endpoint}${query}`);
  }
   // Create a new manga
   async createManga(data: DTOManga): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${this.endpoint}/create-manga`;
    console.log('API URL for create manga:', url); 
    return axios.post<Base<DTOManga>>(url, data);
  }
  // Delete manga by ID
  async deleteManga(idManga: string): Promise<AxiosResponse<Base<DTOManga>>> {
    const url = `${this.endpoint}/delete-manga`;
    console.log('API URL for delete manga:', url); // Debug URL output
    return axios.delete<Base<DTOManga>>(url, {
      data: { idManga },
    });
  }
}

export default ApiService;
