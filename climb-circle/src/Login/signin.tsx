import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {setCurrentUser} from "./reducer";
import {useDispatch} from "react-redux";
import * as client from "./client";

export default function SignIn() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate(`/Home/${user.username}`);
        const closeButton = document.querySelector('#signin-modal .btn-close') as HTMLElement;
        closeButton?.click();
        window.location.reload();
    }

    return (
        <div id="signin-modal" className="modal" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered" style={{width: '425px'}}>
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center justify-content-center position-relative">
                    <button type="button" className="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal"></button>
                    <br/>
                    <img src="../images/icon.png" alt="" height="40px" width="40px" className="mb-3"/>
                    <h4 className="mb-3">Welcome to Climb Circle</h4>
                    <input placeholder="Username" className="form-control mb-3 w-75" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
                    <input placeholder="Password" className="form-control mb-3 w-75"  value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} type="password"/>
                    <button className="blue-btn mb-2" onClick={signin}>Sign In</button>
                    <p>Not on ClimbCircle yet?{' '}
                        <button className="btn btn-link p-0 text-primary" data-bs-toggle="modal" data-bs-target="#signup-modal" style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign Up</button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}