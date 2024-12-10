import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as loginClient from "../../../Login/client";

export default function LikesModal({ likes, onClose }: { likes: any[], onClose: () => void}) {
    const [users, setUsers] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const fetchCurrentUser = async () => {
        try {
            const user = await loginClient.fetchCurrentUser();
            setCurrentUser(user);
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userDetails = await Promise.all(likes.map(userId => loginClient.findUserById(userId)));
                setUsers(userDetails);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
        fetchCurrentUser();
    }, [likes]);

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Liked By</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {users.length === 0 ? (
                            <p>No likes yet...</p>
                        ) : (
                            <ul className="list-group">
                                {users.map(user => (
                                    <li key={user._id} className="list-group-item">
                                        <Link
                                            to={
                                                currentUser && user._id === currentUser._id
                                                    ? `/Profile/${currentUser.username}`
                                                    : `/Profile/User/${user._id}`
                                            }
                                            className="text-decoration-none"
                                        >
                                            {user.username}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
