export default function Login() {
    return (
        <div id="login-modal" className="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered" style={{width: '425px'}}>
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center justify-content-center position-relative">
                    <button type="button" className="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal"></button>
                    <br/>
                    <img src="../images/icon.png" alt="" height="40px" width="40px" className="mb-3"/>
                    <h4 className="mb-3">Welcome to Climb Circle</h4>
                    <input placeholder="Username" className="form-control mb-3 w-75"/>
                    <input placeholder="Password" className="form-control mb-3 w-75"/>
                    <button className="blue-btn mb-2">Log In</button>
                    <p>Not on ClimbCircle yet?{' '}
                        <button className="btn btn-link p-0 text-primary" data-bs-toggle="modal" data-bs-target="#signup-modal" style={{ textDecoration: 'underline', cursor: 'pointer' }}>Sign Up</button>
                    </p>
                    </div>
                </div>
            </div>
        </div>
    );
}