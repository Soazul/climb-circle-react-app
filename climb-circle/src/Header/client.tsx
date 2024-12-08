import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

// const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
// const POSTS_API = `http://localhost:4000/api/posts`;
// //${REMOTE_SERVER}/api/posts
const REMOTE_SERVER = 'http://localhost:4000';
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findUsersByPartialUsername = async (username: string) => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/search?username=${username}`);
    return data;
}
