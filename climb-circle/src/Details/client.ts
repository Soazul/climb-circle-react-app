import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const GYM_PROFILE_API = `${REMOTE_SERVER}/api/users/gyms`;

export const findGymByPlaceId = async (placeId: any) => {
    const response = await axiosWithCredentials.get(`${GYM_PROFILE_API}/${placeId}`);
    return response.data;
};

export const favoriteGym = async (gymUserId: any) => {
    const response = await axiosWithCredentials.post(`${GYM_PROFILE_API}/favorite/${gymUserId}`);
    return response.data;
}

export const unfavoriteGym = async (gymUserId: any) => {
    const response = await axiosWithCredentials.post(`${GYM_PROFILE_API}/unfavorite/${gymUserId}`);
    return response.data;
}

export const registerGym = async (placeId: any) => {
    const response = await axiosWithCredentials.post(`${GYM_PROFILE_API}/register/${placeId}`);
    return response.data;
}

export const unregisterGym = async (placeId: any) => {
    const response = await axiosWithCredentials.post(`${GYM_PROFILE_API}/unregister/${placeId}`);
    return response.data;
}
