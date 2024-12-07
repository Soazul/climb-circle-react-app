import Card from '../Home/Card';
import Header from '../Header';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as usersClient from "../Login/client";
import * as postClient from "../Home/client";
import PostModal from '../Home/Card/PostModal';

export default function UserProfile() {
    const { userId } = useParams();
    const [profile, setProfile] = useState<any>({});
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUserProfile = async (userId?: any) => {
        const userProfile = await usersClient.findUserById(userId);
        setProfile(userProfile);
    };

    const fetchUserPosts = async (userId?: any) => {
        const userPosts = await postClient.findPostsByUserId(userId);
        setPosts(userPosts);
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
    }, [userId]);

    return (
        <div id="user-profile" className="py-4" style={{ padding: '15px' }}>
            {isModalOpen && (<div className="backdrop-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>)}
            <Header />
            <div className="d-flex justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <div className="d-flex justify-content-center align-items-center mb-2">
                        <span style={{ fontSize: '20px' }}>{profile.username}</span>
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
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
}
