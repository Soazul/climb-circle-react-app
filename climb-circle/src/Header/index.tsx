import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function Header() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="input-group px-2">
                <Link to={currentUser ? `/Home/${currentUser.username}` : "/Home"}>
                    <img src="../images/icon.png" alt="Home Icon" height="40px" width="40px" />
                </Link>
                <Link to="/Map" className="ms-3 mt-2 text-success text-decoration-none">Map</Link>
                <input className="form-control rounded ms-3" placeholder="Search" />
            </div>
        </div>
    );
}