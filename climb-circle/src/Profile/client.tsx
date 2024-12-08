import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const PROFILE_API = `http://localhost:4000/api/users`;

export const isFollowing = async (userId: any, currentUserId: any) => {
    const response = await axios.get(`${PROFILE_API}/${userId}/${currentUserId}/isFollowing`);
    return response.data.isFollowing;
};

export const followUser = async (userId: any, currentUserId: any) => {
    await axios.post(`${PROFILE_API}/${userId}/${currentUserId}/follow`);
};

export const unfollowUser = async (userId: any, currentUserId: any) => {
    await axios.post(`${PROFILE_API}/${userId}/${currentUserId}/unfollow`);
};
