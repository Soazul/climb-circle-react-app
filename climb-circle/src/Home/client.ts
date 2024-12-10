import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
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
    const response = await axiosWithCredentials.get(`${POSTS_API}/${userId}/posts`);
    return response.data;
};

export const findLikedPostsByUserId = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${userId}/posts/liked`);
    return response.data;
};

export const findFollowingPosts = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${userId}/following/posts`)
    return response.data;
};

export const findExplorePosts = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${userId}/explore/posts`)
    return response.data;
};