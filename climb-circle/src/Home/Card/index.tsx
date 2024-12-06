import { FaHeart } from 'react-icons/fa';

export default function Card({ username, likes, photo, onClick }: 
    { username: string, location: string, description: string, climbType?: string, angle?: number, photo: string, likes: number, onClick: () => void }) {
    return (
        <div id="card" className="card rounded-3 m-1" style={{ width: '100%', aspectRatio: '1 / 1' }} data-bs-toggle="modal" data-bs-target="#post-modal" onClick={onClick} >
            <div className="card-body d-flex flex-column justify-content-between p-3">
                <div style={{ flex: 1, backgroundImage: `url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }} />
                
                <div className="d-flex justify-content-between align-items-center mt-3">
                    {username && <p className="card-text mb-0" style={{ fontSize: '18px' }}>{username}</p>} {/* Larger font for username */}
                    
                    
                    {/* <button className="gray-btn ms-3">Follow</button> Added `ms-3` to give spacing on the left */}
                    
                    
                    <div className="d-flex align-items-center">
                        <FaHeart className="me-2 text-danger" />
                        <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}