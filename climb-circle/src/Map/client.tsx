import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MAPS_API = `${REMOTE_SERVER}/api/maps`;

export const fetchPlaces = async (path: string, params: Record<string, any>) => {
    const { data } = await axiosWithCredentials.get(`${MAPS_API}${path}`, { params });
    return data;
};
