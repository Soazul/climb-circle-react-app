import Card from './Card';
import Login from '../Login/login';
import SignUp from '../Login/signup';
import { Link } from 'react-router-dom';
import Header from '../Header.tsx';
import { BsPlusCircle } from 'react-icons/bs';
import Create from '../Create';

export default function Home() {
    const climbs = [
        { username: 'username', caption: 'caption', image: '../images/test.png', likes: 5 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe1.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/shoe.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf', image: '../images/test.png',likes: 10 },
        { username: 'user2', caption: 'asdfasdfaf',image: '../images/hoodie1.png', likes: 10 }
    ];

    return (
        <div id="home" className="py-4" style={{ padding: '15px' }}> 
            <div className="row mb-4">
                <Header/>
                <div className="col-12 col-md-6 text-end d-flex justify-content-end align-items-center">
                    <button className="blue-btn me-3" data-bs-toggle="modal" data-bs-target="#login-modal">
                        Log In
                    </button>
                    <Login />
                    <button className="gray-btn me-2" data-bs-toggle="modal" data-bs-target="#signup-modal">
                        Sign Up
                    </button>
                    <SignUp />
                </div>
            </div>

            <div className="row g-3">
                {climbs.map((climb, index) => (
                    <div className="col-12 col-md-6 col-lg-4 col-lg-4 mb-2" key={index}>
                        <Card username={climb.username} caption={climb.caption} likes={climb.likes} image={climb.image}/>
                    </div>
                ))}
            </div>
            <BsPlusCircle size={'30px'} style={{color: '#A3B1BE'}} data-bs-toggle="modal" data-bs-target="#create-modal"/>
            <Create/>
        </div>
    );
}
