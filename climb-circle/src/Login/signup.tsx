import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useState } from "react";
import { setCurrentUser } from "./reducer";

export default function SignUp() {
    const [user, setUser] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signup = async () => {
        const currentUser = await client.signup(user);
        dispatch(setCurrentUser(currentUser));
        navigate(`/Home/${user.username}`);
        const closeButton = document.querySelector('#signup-modal .btn-close') as HTMLElement;
        closeButton?.click();
    }

    return (
        <div id="signup-modal" className="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered" style={{width: '425px'}}>
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center justify-content-center position-relative">
                    <button type="button" className="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal"></button>
                    <br/>
                    <img src="../images/icon.png" alt="" height="40px" width="40px" className="mb-3"/>
                    <h4 className="mb-3">Welcome to Climb Circle</h4>
                    <div className="d-flex w-75 mb-3">
                        <input placeholder="Name" className="form-control me-2" style={{width: '50%'}} value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}/>
                        <select className="form-select" style={{width: '50%'}} value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                            <option value="" disabled selected>Role</option>
                            <option value="Gym Owner">Gym Owner</option>
                            <option value="Member">Member</option>
                        </select>
                    </div>
                    <input placeholder="Username" className="form-control mb-3 w-75" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                    <input placeholder="Password" className="form-control mb-3 w-75" value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                    <button className="blue-btn mb-2" onClick={signup}>Sign Up</button>
                    <p>Already a member?{' '}
                        <button className="btn btn-link p-0 text-primary" data-bs-toggle="modal" data-bs-target="#signin-modal" style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign In</button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}