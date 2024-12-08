import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const POSTS_API = `${REMOTE_SERVER}/api/posts`;

export const createPost = async (post: any) => {
    const { data } = await axiosWithCredentials.post(`${POSTS_API}`, post);
    return data;
};

export const fetchPosts = async () => {
    const { data } = await axiosWithCredentials.get(`${POSTS_API}`);
    return data;
};

export const deletePost = async (postId: string) => {
    const response = await axiosWithCredentials.delete(`${POSTS_API}/${postId}`);
    return response.data;
};

export const updatePost = async (postId: string, post: any) => {
    const { data } = await axiosWithCredentials.put(`${POSTS_API}/${postId}`, post);
    return data;
};

export const findPostsByUserId = async (userId: string) => {
    const response = await axios.get(`${USERS_API}/${userId}/posts`);
    return response.data;
};