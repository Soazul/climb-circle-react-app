import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const GYM_PROFILE_API = `${REMOTE_SERVER}/api/users/gyms`;

export const findGymByPlaceId = async (placeId: any) => {
    const response = await axiosWithCredentials.get(`${GYM_PROFILE_API}/${placeId}`);
    return response.data;
};
