import { FaHeart } from 'react-icons/fa';

export default function Card({ username, caption, climbType, angle, likes, image }:
    { username: string, caption: string, climbType?: string, angle?: number, likes: number, image: string }) {
    return (
        <div id="card" className="card rounded-3 m-1" style={{ width: '100%', aspectRatio: '1 / 1' }}>
            <div className="card-body d-flex flex-column justify-content-between p-3">
                <h5 className="card-title mb-2">{username}</h5>
                <div style={{ flex: 1, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }} />
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <p className="card-text mb-0">{caption}</p>
                    {climbType && <p className="card-text mb-0">{"Climb Type: " + climbType}</p>}
                    {angle && <p className="card-text mb-0">{"Angle: " + angle.toString()}</p>}
                    <div className="d-flex align-items-center">
                        <FaHeart className="me-2 text-danger" />
                        <span>{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

