import Card from '../Home/Card';
import Header from '../Header';
import { BsPlusCircleFill } from 'react-icons/bs';
import Create from '../Create';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import * as usersClient from "../Login/client";
import { setCurrentUser } from "../Login/reducer";
import { PencilFill } from 'react-bootstrap-icons';
import PostModal from '../Home/Card/PostModal';
import { setPosts } from '../Home/reducer';
import * as postClient from "../Home/client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false); 
    const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const {posts} = useSelector((state: any) => state.postsReducer);

    const updateProfile = async () => {
        const updatedProfile = await usersClient.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
        setIsEditingUsername(false);
        setIsEditingPassword(false);
    };

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Home");
        setProfile(currentUser);
    };

    const signout = async () => {
        await usersClient.signout();
        dispatch(setCurrentUser(null));
        navigate("/Home");
    };

    const fetchPosts = async () => {
        const data = await postClient.fetchPosts();
        dispatch(setPosts(data));
    }

    useEffect(() => { fetchProfile(); fetchPosts();}, []);

    const [selectedPost, setSelectedPost] = useState<any>(null);
    
    const handleCardClick = (post: any) => {
        setSelectedPost(post);
    };

    const climbs = [
        { username: 'annie', location: "nyc", description: "this is my first climb!", climbType: "Slab", angle: 20, photo: '../images/test.png', likes: 5 },
        { username: 'hi', location: "bos", description: "this is my second climb!", climbType: "Overhang", angle: 15, photo: '../images/shoe1.png', likes: 15 },
        { username: 'hello', location: "la", description: "this is my third climb!", climbType: "Cave", angle: 5, photo: '../images/test.png', likes: 30 },
        { username: 'chicken', location: "sf", description: "this is my fourth climb!", climbType: "Overhang", angle: 10, photo: '../images/shoe.png', likes: 20 },
        { username: 'wings', location: "nyc", description: "this is my fifth climb!", climbType: "Slab", angle: 5, photo: '../images/test.png', likes: 5 },
        { username: 'tenders', location: "la", description: "this is my sixth climb!", climbType: "Overhang", angle: 19, photo: '../images/hoodie1.png', likes: 0 }
    ];

    return (
        <div id="profile" className="py-4" style={{ padding: '15px' }}>
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
                            onClick={() => setIsEditingPassword(!isEditingPassword)} // Toggle password editing mode
                        />
                    </div>
                    <p className="text-center">0 post 0 followers 0 following</p>
                </div>
            </div>
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
            <BsPlusCircleFill size={'40px'} style={{color: '#A3B1BE', position: 'fixed', bottom: '50px', right: '50px', zIndex: 1}} data-bs-toggle="modal" data-bs-target="#create-modal"/>
            <Create />
            {selectedPost && (<PostModal username={selectedPost.username} location={selectedPost.location} description={selectedPost.description} climbType= {selectedPost.climbType} angle={selectedPost.angle} photo={selectedPost.photo} likes={selectedPost.likes} isEditing={true}/>)}
        </div>
    );
}