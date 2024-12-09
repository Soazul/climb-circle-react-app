import Card from '../Home/Card';
import Header from '../Header';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as usersClient from "../Login/client";
import * as postClient from "../Home/client";
import PostModal from '../Home/Card/PostModal';
import * as profileClient from "./client";

export default function UserProfile() {
    const { userId } = useParams();
    const [profile, setProfile] = useState<any>({});
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    console.log("currentUserUserProfile", currentUser);
    const fetchUserProfile = async (userId?: any) => {
        const userProfile = await usersClient.findUserById(userId);
        console.log(userProfile.followers.length);
        setProfile(userProfile);
    };

    const fetchUserPosts = async (userId?: any) => {
        const userPosts = await postClient.findPostsByUserId(userId);
        setPosts(userPosts);
    };

    const fetchFollowStatus = async () => {
        const followingStatus = await profileClient.isFollowing(userId);
        setIsFollowing(followingStatus);
    };

    const toggleFollow = async () => {
        if (isFollowing) {
            await profileClient.unfollowUser(userId);
        } else {
            await profileClient.followUser(userId);
        }
        setIsFollowing(!isFollowing);
    };

    const handleCardClick = (post: any) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    useEffect(() => {
        fetchUserProfile(userId);
        fetchUserPosts(userId);
        fetchFollowStatus();
    }, [userId]);

    return (
        <div id="user-profile" className="container-fluid vh-100 d-flex flex-column">
            {isModalOpen && (<div className="backdrop-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>)}
            <div className="row mb-4 mt-4 header-container">
                <Header />
            </div>
            <div className="d-flex justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <div className="d-flex justify-content-center align-items-center">
                        <span style={{ fontSize: '20px', marginRight: '10px' }}>{profile.username}</span>
                        <button
                            className={`btn ${isFollowing ? 'btn-outline-danger' : 'btn-outline-primary'}`}
                            onClick={toggleFollow}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                    <p className="text-center">
                        {profile.postsCount || 0} posts {profile.followersCount || 0} followers {profile.followingCount || 0} following
                    </p>
                </div>
            </div>
            <div className="row g-3">
                {posts.map((post: any) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={post._id}>
                        <Card
                            postId={post._id}
                            username={post.username}
                            location={post.location}
                            description={post.description}
                            climbType={post.climbType}
                            angle={post.angle}
                            photo={post.photo}
                            likes={post.likes}
                            onClick={() => handleCardClick(post)}
                        />
                    </div>
                ))}
            </div>
            {selectedPost && isModalOpen && (
                <PostModal
                    username={selectedPost.username}
                    location={selectedPost.location}
                    description={selectedPost.description}
                    climbType={selectedPost.climbType}
                    angle={selectedPost.angle}
                    photo={selectedPost.photo}
                    likes={selectedPost.likes}
                    isEditing={false}
                    _id={selectedPost._id}
                    cost={selectedPost.cost} eventDate={selectedPost.eventDate}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}
