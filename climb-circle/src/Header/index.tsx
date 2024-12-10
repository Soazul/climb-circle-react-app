import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import * as loginClient from "../Login/client";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as client from "./client"

interface User {
    username: string;
};

export default function Header() {
    // const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [currentUser, setCurrentUser] = useState<User|null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    
    const fetchUser = async () => {
        const user = await loginClient.fetchCurrentUser();
        setCurrentUser(user);
    };

    useEffect(() => {
        fetchUser();
    }, []);
    
    useEffect(() => {
        if (searchQuery.trim()) {
            const fetchUsers = async () => {
                const results = await client.findUsersByPartialUsername(searchQuery);
                setSearchResults(results);
            };
            fetchUsers();
            setShowDropdown(true);
        } else {
            setSearchResults([]);
            setShowDropdown(false);
        }
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleResultClick = (userId: string) => {
        navigate(`/Profile/User/${userId}`)
        setSearchQuery('');
        setShowDropdown(false); 
    };

    return (
        <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="input-group px-2 position-relative">
                <Link to={currentUser ? `/Home/${currentUser.username}` : "/Home"}>
                    <img src="../images/icon.png" alt="Home Icon" height="40px" width="40px" />
                </Link>
                <Link to="/Map" className="ms-3 mt-2 text-success text-decoration-none">Map</Link>
                <input
                    className="form-control rounded ms-3"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)}
                />
                {showDropdown && searchResults.length > 0 && (
                    <div className="dropdown-menu show position-absolute w-100 mt-1 shadow bg-white overflow-auto" style={{ maxHeight: '200px', zIndex: 10 }}>
                        {searchResults.map((user: any) => (
                            <button
                                key={user._id}
                                className="dropdown-item text-start"
                                onClick={() => handleResultClick(user._id)}
                            >
                                {user.username}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
