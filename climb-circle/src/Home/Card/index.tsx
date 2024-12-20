import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import * as likesClient from "./likesClient";
import * as loginClient from "../../Login/client";
import * as postClient from "../client";
import LikesModal from "./LikesModal"

interface User {
    username: string;
    _id: string;
};

export default function Card({ postId, username, location, description, climbType, angle, photo, likes, onClick }:
    { postId: any, username: string, location: string, description: string, climbType?: string, angle?: number, photo: string, likes: Array<any>, onClick: () => void }) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [liked, setLiked] = useState(() => likes.includes(currentUser?._id));
    const [likeCount, setLikeCount] = useState(likes.length);
    const [showLikesModal, setShowLikesModal] = useState(false);

    const handleLikeClick = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!currentUser) {
            const signInButton = document.querySelector<HTMLButtonElement>('[data-bs-target="#signin-modal"]');
            if (signInButton) {
                signInButton.click();
            }
            return;
        }

        try {
            if (liked) {
                await likesClient.unlikePost(postId, currentUser._id);
                setLikeCount((prev) => prev - 1);
            } else {
                await likesClient.likePost(postId, currentUser._id);
                setLikeCount((prev) => prev + 1);
            }
            setLiked(!liked);
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    const handleLikesClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowLikesModal(true);
    };

    const handleCloseModal = () => setShowLikesModal(false);

    return (
        <>
            <div id="card" className="card rounded-3 m-1" style={{ width: '100%', aspectRatio: '1 / 1' }} onClick={onClick}>
                <div className="card-body d-flex flex-column justify-content-between p-3">
                    <h5 className="card-title mb-2">{username}</h5>
                    <div style={{ flex: 1, backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }} />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="card-text mb-1">
                            {description.substring(0, 40)}
                            {description.length > 40 ? '...' : ''}
                        </p>
                        <div className="d-flex align-items-center">
                            {liked ? (
                                <FaHeart className="me-2 text-danger" onClick={handleLikeClick} style={{ cursor: 'pointer' }} />
                            ) : (
                                <FaRegHeart className="me-2 text-secondary" onClick={handleLikeClick} style={{ cursor: 'pointer' }} />
                            )}
                            <span onClick={handleLikesClick} style={{ cursor: 'pointer' }}>{likeCount}</span>
                        </div>
                    </div>
                </div>
            </div>
            {showLikesModal && (
                <LikesModal
                    likes={likes}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}
