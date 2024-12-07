import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MAPS_API = `http://localhost:4000/api/maps`;
//${REMOTE_SERVER}/api/posts
const API_KEY = 'AIzaSyCfqkGTA5KQ2NCYiaSHI3b2Kj9aBM5xSDs';

export const fetchPlaces = async (path: string, params: Record<string, any>) => {
    const { data } = await axiosWithCredentials.get(`${MAPS_API}${path}`, { params });
    return data;
};
