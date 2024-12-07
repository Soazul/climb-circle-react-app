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

export default function Home() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const posts = useSelector((state: any) => state.postsReducer.posts);
    console.log(posts);
    const climbs = [
        { username: 'annie', location: "nyc", description: "this is my first climb!", climbType: "Slab", angle: 20, photo: '../images/test.png', likes: 5 },
        { username: 'hi', location: "bos", description: "this is my second climb!", climbType: "Overhang", angle: 15, photo: '../images/shoe1.png', likes: 15 },
        { username: 'hello', location: "la", description: "this is my third climb!", climbType: "Cave", angle: 5, photo: '../images/test.png', likes: 30 },
        { username: 'chicken', location: "sf", description: "this is my fourth climb!", climbType: "Overhang", angle: 10, photo: '../images/shoe.png', likes: 20 },
        { username: 'wings', location: "nyc", description: "this is my fifth climb!", climbType: "Slab", angle: 5, photo: '../images/test.png', likes: 5 },
        { username: 'tenders', location: "la", description: "this is my sixth climb!", climbType: "Overhang", angle: 19, photo: '../images/hoodie1.png', likes: 0 }
    ];
    const [activeLink, setActiveLink] = useState('following');

    const [selectedPost, setSelectedPost] = useState<any>(null);

    const handleCardClick = (post: any) => {
        setSelectedPost(post);
    };

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const fetchPosts = async () => {
        const data = await client.fetchPosts();
        dispatch(setPosts(data));
    }
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Session>
        <div id="home" className="py-4" style={{ padding: '15px' }}>
            <div className="row mb-4">
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
                <Link to="#" className="me-3" style={{textDecoration: 'none', color: activeLink === 'following' ? '#0023D3' : '#A3B1BE'}} onClick={() => handleLinkClick('following')}>Following</Link>
                <Link to="#" style={{textDecoration: 'none', color: activeLink === 'explore' ? '#0023D3' : '#A3B1BE'}} onClick={() => handleLinkClick('explore')}>Explore</Link>
            </div>)}
            <div className="row g-3">
                {climbs.map((post: any) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={post._id}>
                        <Card username={post.username} location={post.location} description={post.description} climbType={post.climbType} angle={post.angle} photo={post.photo} likes={post.likes} onClick={() => handleCardClick(post)}/>
                    </div>
                ))}
                {posts.map((post: any) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={post._id}>
                        <Card username={post.username} location={post.location} description={post.description} climbType={post.climbType} angle={post.angle} photo={post.photo} likes={post.likes} onClick={() => handleCardClick(post)}/>
                    </div>
                ))}
            </div>
            {currentUser && (
                <div>
                <BsPlusCircleFill size={'40px'} style={{color: '#A3B1BE', position: 'fixed', bottom: '50px', right: '50px', zIndex: 1}} data-bs-toggle="modal" data-bs-target="#create-modal"/>
                    <Create/>
                </div>)}
            {selectedPost && (<PostModal username={selectedPost.username} location={selectedPost.location} description={selectedPost.description} climbType= {selectedPost.climbType} angle={selectedPost.angle} photo={selectedPost.photo} likes={selectedPost.likes} isEditing={false} />)}

        </div>
        </Session>
    );
}