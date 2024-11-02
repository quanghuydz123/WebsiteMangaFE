import axios from "axios";
import { Base, GetGenreResponse } from "../constrants/apiResponse";
import { API_BASE_URL } from "./apiService";

// Get all genres with query parameters
async function getAllGenres(): Promise<Base<GetGenreResponse>> {
    const response = await axios.get<Base<GetGenreResponse>>(`${API_BASE_URL}/genres/get-advanced-page?page=1&limit=100&filter=_id%2Cname`);
    return response.data
}

export default {
    getAllGenres
}