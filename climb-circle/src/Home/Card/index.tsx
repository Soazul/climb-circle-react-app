import { FaHeart } from 'react-icons/fa';

export default function Card({ username, location, description, climbType, angle, likes, photo, onClick }:
    { username: string, location: string, description: string, climbType?: string, angle?: number, photo: string, likes: number, onClick: () => void }) {

    return (
        <div id="card" className="card rounded-3 m-1" style={{ width: '100%', aspectRatio: '1 / 1' }} data-bs-toggle="modal" data-bs-target="#post-modal" onClick={onClick} >
            <div className="card-body d-flex flex-column justify-content-between p-3">
                <h5 className="card-title mb-2">{username}</h5>
                <div style={{ flex: 1, backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }} />
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="card-text mb-1">
                        {description.substring(0, 40)}
                        {description.length > 40 ? '...' : ''}
                    </p>
                    {/* {username && <p className="card-text mb-0" style={{ fontSize: '18px' }}>{username}</p>} */}
                    <div className="d-flex align-items-center">
                        <FaHeart className="me-2 text-danger" />
                        <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}