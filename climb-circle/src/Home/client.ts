import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const POSTS_API = `http://localhost:4000/api/posts`;
// //${REMOTE_SERVER}/api/posts
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const POSTS_API = `${REMOTE_SERVER}/api/posts`;

// export const createPost = async (post: any) => {
//     console.log("post", post);
//     const { data } = await axiosWithCredentials.post(`${POSTS_API}`, post);
//     console.log("data", data);
//     return data;
// };

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

// import axios from "axios";
// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const USERS_API = `${REMOTE_SERVER}/api/users`;
// const POSTS_API = `${REMOTE_SERVER}/api/posts`;

// export const savePost = async (postId: string, post: string) => {
//     const response = await axios.put(`${POSTS_API}/${postId}`, post);
//     return response.data;
// };
// export const deletePost = async (postId: string) => {
//     const response = await axios.delete(`${USERS_API}/posts/${postId}`);
//     return response.data;
// };
// export const createPost = async (postId: string, post: any) => {
//     const response = await axios.post(`${USERS_API}/${postId}/posts`, post);
//     return response.data
// };
