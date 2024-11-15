import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Card(
    { username, caption, likes }: {
        username: string, caption: string, likes: number
    }) {
    return (
        <div id="card" className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <p className="card-text">{caption}</p>
                <div className="d-flex align-items-center">
                    <FaHeart className="me-2 text-secondary" />
                    <span>{likes}</span>
                </div>
            </div>
        </div>
    );
}