import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const PROFILE_API = `${REMOTE_SERVER}/api/users`;
const POSTS_API = `${REMOTE_SERVER}/api/posts`;

export const isFollowing = async (userId: any) => {
    console.log("isFollowing");
    const response = await axiosWithCredentials.get(`${PROFILE_API}/${userId}/isFollowing`);
    return response.data.isFollowing;
};

export const followUser = async (userId: any) => {
    console.log("followUser");
    await axiosWithCredentials.post(`${PROFILE_API}/${userId}/follow`);
};

export const unfollowUser = async (userId: any) => {
    console.log("unfollowUser");
    await axiosWithCredentials.post(`${PROFILE_API}/${userId}/unfollow`);
};

export const updatePostUsernames = async (userId: any, username: any) => {
    await axiosWithCredentials.put(`${POSTS_API}/${userId}/update-usernames`, { username });
}
