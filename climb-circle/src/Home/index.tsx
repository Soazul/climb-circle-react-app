import Card from './Card';
import SignIn from '../Login/signin';
import SignUp from '../Login/signup';
import Header from '../Header';
import { BsPlusCircleFill } from 'react-icons/bs';
import Create from '../Create';
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Session from '../Login/Session';
import { useEffect, useState } from "react";
import { setPosts } from './reducer';
import * as client from "./client";
import PostModal from './Card/PostModal';
import * as loginClient from "../Login/client";

export default function Home() {
    const dispatch = useDispatch();    
    const [currentUser, setCurrentUser] = useState<any|null>(null);
    const fetchUser = async () => {
        const user = await loginClient.fetchCurrentUser();
        setCurrentUser(user);
    };

    const [posts, setPosts] = useState<any>([]);
    const [activeLink, setActiveLink] = useState('explore');
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

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const fetchPosts = async () => {
        const data = await client.fetchPosts();
        // dispatch(setPosts(data));
        setPosts(data);
    };

    const fetchActivePosts = async () => {
        if (!currentUser) {
            fetchPosts();
        } else if (activeLink === 'following') {
            const data = await client.findFollowingPosts(currentUser._id);
            // dispatch(setPosts(data));
            setPosts(data);
        } else if (activeLink === 'explore') {
            const data = await client.findExplorePosts(currentUser._id);
            // dispatch(setPosts(data));
            setPosts(data);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchActivePosts();
    }, [currentUser, activeLink]);


    return (
        <Session>
            <div id="home" className="py-4" style={{ padding: '15px' }}>
                {isModalOpen && (<div className="backdrop-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>)}
                <div className="row mb-4">
                    <div className="d-flex align-items-center">
                        <p className="ms-2 me-2">Ryan Huang 01 and Annie Zhang 02</p>
                        <a href="https://github.com/Soazul/climb-circle-react-app" className="me-2">
                            <button className='btn btn-primary mb-3'>React GitHub</button>
                        </a>
                        <a href="https://github.com/Soazul/climb-circle-node-server-app">
                            <button className='btn btn-primary mb-3'>Node GitHub</button>
                        </a>
                    </div>
                    <Header />
                    <div className="col-12 col-md-6 text-end d-flex justify-content-end align-items-center">
                        {currentUser ? (
                            <Link to={`/Profile/${currentUser.username}`} className="d-flex align-items-center">
                                <FaUserCircle size="30px" />
                            </Link>
                        ) : (
                            <>
                                <button className="blue-btn me-3" data-bs-toggle="modal" data-bs-target="#signin-modal">
                                    Sign In
                                </button>
                                <SignIn />
                                <button className="gray-btn me-2" data-bs-toggle="modal" data-bs-target="#signup-modal">
                                    Sign Up
                                </button>
                                <SignUp />
                            </>
                        )}
                    </div>
                </div>
                {currentUser && (
                    <div className="d-flex mb-4 ms-2">
                        <Link to="#" className="me-3"style={{ textDecoration: 'none', color: activeLink === 'explore' ? '#0023D3' : '#A3B1BE' }} onClick={() => handleLinkClick('explore')}>Explore</Link>
                        <Link to="#" style={{ textDecoration: 'none', color: activeLink === 'following' ? '#0023D3' : '#A3B1BE' }} onClick={() => handleLinkClick('following')}>Following</Link>
                    </div>)}
                <div className="row g-3">
                    {posts.map((post: any) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-2" key={post._id}>
                            <Card postId={post._id} username={post.username} location={post.location} description={post.description} climbType={post.climbType} angle={post.angle} photo={post.photo} likes={post.likes} onClick={() => handleCardClick(post)} />
                        </div>
                    ))}
                </div>
                {currentUser && (
                    <div>
                        <BsPlusCircleFill size={'40px'} style={{ color: '#A3B1BE', position: 'fixed', bottom: '50px', right: '50px', zIndex: 1 }} data-bs-toggle="modal" data-bs-target="#create-modal" />
                        <Create />
                    </div>)}
                {selectedPost && isModalOpen && (<PostModal username={selectedPost.username} location={selectedPost.location} description={selectedPost.description} climbType={selectedPost.climbType} angle={selectedPost.angle} photo={selectedPost.photo} likes={selectedPost.likes} isEditing={false} _id={selectedPost._id} cost={selectedPost.cost} eventDate={selectedPost.eventDate} onClose={handleModalClose} />)}
            </div>
        </Session>
    );
}