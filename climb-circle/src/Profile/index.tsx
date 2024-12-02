import Card from '../Home/Card';
import Header from '../Header';
import { BsPlusCircleFill } from 'react-icons/bs';
import Create from '../Create';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import * as client from "../Login/client";
import { setCurrentUser } from "../Login/reducer";
import { PencilFill } from 'react-bootstrap-icons';

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false); 
    const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
        setIsEditingUsername(false);
        setIsEditingPassword(false);
    };

    const fetchProfile = () => {
        if (!currentUser) return navigate("/Home");
        setProfile(currentUser);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Home");
    };

    useEffect(() => { fetchProfile(); }, []);

    const climbs = [
        { username: 'username', caption: 'caption', image: '../images/test.png', likes: 5 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe1.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/hoodie1.png', likes: 10 }
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
                {climbs.map((climb, index) => (
                    <div className="col-12 col-md-6 col-lg-4 col-lg-4 mb-2" key={index}>
                        <Card username={climb.username} caption={climb.caption} likes={climb.likes} image={climb.image} />
                    </div>
                ))}
            </div>
            <BsPlusCircleFill
                size={'40px'}
                style={{
                    color: '#A3B1BE',
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                    zIndex: 1,
                }}
                data-bs-toggle="modal"
                data-bs-target="#create-modal"
            />
            <Create />
        </div>
    );
}