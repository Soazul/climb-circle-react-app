import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const POSTS_API = `${REMOTE_SERVER}/api/posts`;

export const likePost = async (postId: any, userId: any) => {
    await axiosWithCredentials.post(`${POSTS_API}/${postId}/${userId}/like`);
    await axiosWithCredentials.post(`${USERS_API}/${userId}/${postId}/like`);
};

export const unlikePost = async (postId: any, userId: any) => {
    await axiosWithCredentials.post(`${POSTS_API}/${postId}/${userId}/unlike`);
    await axiosWithCredentials.post(`${USERS_API}/${userId}/${postId}/unlike`);
};

