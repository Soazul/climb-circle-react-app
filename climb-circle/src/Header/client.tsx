import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findUsersByPartialUsername = async (username: string) => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/search?username=${username}`);
    return data;
}
