import Card from '../Home/Card';
import Header from '../Header';
import { BsPlusCircleFill } from 'react-icons/bs';
import Create from '../Create';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as usersClient from "../Login/client";
import { PencilFill } from 'react-bootstrap-icons';
import PostModal from '../Home/Card/PostModal';
import { setPosts } from '../Home/reducer';
import * as postClient from "../Home/client";
import * as loginClient from "../Login/client";
import * as client from "./client";

interface User {
    _id: string;
    username: string;
};

export default function Profile() {
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [profile, setProfile] = useState<any>({});
    const [activeTab, setActiveTab] = useState<'posts' | 'liked' | 'favoriteGyms'>('posts');
    const [likedPosts, setLikedPosts] = useState<any[]>([]);
    const [favoriteGyms, setFavoriteGyms] = useState<any[]>([]);
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
    const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { posts } = useSelector((state: any) => state.postsReducer);
    const [posts, setPosts] = useState<any[]>([]);

    const updateProfile = async () => {
        const updatedProfile = await usersClient.updateUser(profile);
        setCurrentUser(updatedProfile);
        setIsEditingUsername(false);
        setIsEditingPassword(false);
    };

    const updateUserPosts = async () => {
        if (!currentUser) return;
        try {
            console.log(currentUser);
            await client.updatePostUsernames(currentUser._id, profile.username);
            fetchPosts();
        } catch (err) {
            console.error("Failed to update user posts:", err);
        }
    }

    const fetchProfile = async () => {
        try {
            const user = await loginClient.fetchCurrentUser();
            setCurrentUser(user);
            setProfile(user);
        } catch {
            navigate("/Home");
        }
    };

    const signout = async () => {
        await usersClient.signout();
        setCurrentUser(null);
        navigate("/Home");
    };

    const fetchPosts = async () => {
        if (!currentUser) return;
        const data = await postClient.findPostsByUserId(currentUser._id);
        // dispatch(setPosts(data));
        setPosts(data);
    };

    const fetchLikedPosts = async () => {
        if (currentUser) {
            const data = await postClient.findLikedPostsByUserId(currentUser._id);
            setLikedPosts(data);
        }
    };

    const fetchFavoritegyms = async () => {
        if (currentUser) {
            const gyms = await Promise.all(
                currentUser.favoriteGyms.map((gymId: any) => loginClient.findUserById(gymId))
            );
            setFavoriteGyms(gyms);
        }
    };

    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (post: any) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchPosts();
            fetchLikedPosts();
            fetchFavoritegyms();
        }
    }, [currentUser]);

    return (
        <div id="profile" className="py-4" style={{ padding: '15px' }}>
            {isModalOpen && (<div className="backdrop-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>)}
            <div className="row mb-4">
                <Header />
                <div className="col-12 col-md-6 text-end d-flex justify-content-end align-items-center">
                    <button onClick={signout} className="btn btn-danger mb-2" id="wd-signout-btn">Sign out</button>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="col-12 col-md-6 mb-3">
                    <div className="d-flex justify-content-center align-items-center mb-2">
                        {isEditingUsername ? (
                            <input
                                id="wd-username"
                                value={profile.username}
                                className="form-control w-25 text-center"
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateProfile();
                                        updateUserPosts();
                                    }
                                }}
                                style={{ fontSize: '20px', padding: '1px' }}
                            />
                        ) : (
                            <span style={{ fontSize: '20px' }}>{profile.username}</span>
                        )}
                        <PencilFill
                            size="20px"
                            style={{ cursor: "pointer", marginLeft: '10px' }}
                            onClick={() => setIsEditingUsername(!isEditingUsername)}
                        />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-2">
                        {isEditingPassword ? (
                            <input
                                id="wd-password"
                                value={profile.password}
                                className="form-control w-25 text-center"
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateProfile();
                                    }
                                }}
                                style={{ fontSize: '20px', padding: '1px' }}
                            />
                        ) : (
                            <span style={{ fontSize: '20px' }}>{profile.password}</span>
                        )}
                        <PencilFill
                            size="20px"
                            style={{ cursor: "pointer", marginLeft: "10px" }}
                            onClick={() => setIsEditingPassword(!isEditingPassword)}
                        />
                    </div>
                    <p className="text-center">0 post 0 followers 0 following</p>
                </div>
            </div>
            {currentUser && (
                <div className="d-flex mb-4 ms-2">
                    <Link
                        to="#"
                        className={`mx-3 text-decoration-none ${activeTab === 'posts' ? 'text-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        Your Posts
                    </Link>
                    <Link
                        to="#"
                        className={`mx-3 text-decoration-none ${activeTab === 'liked' ? 'text-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('liked')}
                    >
                        Liked Posts
                    </Link>
                    <Link
                        to="#"
                        className={`mx-3 text-decoration-none ${activeTab === 'favoriteGyms' ? 'text-primary' : 'text-secondary'}`}
                        onClick={() => setActiveTab('favoriteGyms')}
                    >
                        Favorite Gyms
                    </Link>
                </div>
            )}
            <div className="row g-3">
                {activeTab === 'posts' && posts.map((post: any) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={post._id}>
                        <Card postId={post._id} username={post.username} location={post.location} description={post.description} climbType={post.climbType} angle={post.angle} photo={post.photo} likes={post.likes} onClick={() => handleCardClick(post)} />
                    </div>
                ))}
                {activeTab === 'liked' && likedPosts.map((post: any) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={post._id}>
                        <Card postId={post._id} username={post.username} location={post.location} description={post.description} climbType={post.climbType} angle={post.angle} photo={post.photo} likes={post.likes} onClick={() => handleCardClick(post)} />
                    </div>
                ))}
                {activeTab === 'favoriteGyms' && favoriteGyms.map((gym: any) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={gym._id}>
                        <Link to={`/profile/User/${gym._id}`} className="text-decoration-none">
                            <div className="card p-3">
                                <h5>{gym.username}</h5>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <BsPlusCircleFill size={'40px'} style={{ color: '#A3B1BE', position: 'fixed', bottom: '50px', right: '50px', zIndex: 1 }} data-bs-toggle="modal" data-bs-target="#create-modal" />
            <Create />
            {selectedPost && isModalOpen && (<PostModal username={selectedPost.username} location={selectedPost.location} description={selectedPost.description} climbType={selectedPost.climbType} angle={selectedPost.angle} photo={selectedPost.photo} likes={selectedPost.likes} isEditing={true} _id={selectedPost._id} cost={selectedPost.cost} eventDate={selectedPost.eventDate} onClose={handleModalClose} />)}
        </div>
    );
}