import { useLocation } from 'react-router-dom';
import Card from './Card';
import SignIn from '../Login/signin';
import SignUp from '../Login/signup';
import Header from '../Header';
import { BsPlusCircleFill } from 'react-icons/bs';
import Create from '../Create';
import { useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Session from '../Login/Session';
import { useState } from "react";

export default function Home() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const climbs = [
        { username: 'username', caption: 'caption', image: '../images/test.png', likes: 5 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe1.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png', likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/hoodie1.png', likes: 10 }
    ];
    const [activeLink, setActiveLink] = useState('following');

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

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
                {climbs.map((climb, index) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-2" key={index}>
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
        </Session>
    );
}