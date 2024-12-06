import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addPost, setPosts } from "../Home/reducer";
import * as client from "../Home/client";
import { ObjectId } from 'bson';

export default function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [post, setPost] = useState({
        description: "Description",
        location: "Location",
        climbType: "Climb Type",
        angle: "",
        photo: ""
    });

    const generateId = () => {
        const id = new ObjectId();
        return id;
    }

    const handlePost = async () => {
        try {
            const postId = generateId();
            const newPost = await client.createPost({...post, _id: postId});
            dispatch(addPost(newPost));
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/Home/*`);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log("imageUrl", imageUrl);
            setPost({ ...post, photo: imageUrl });
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <div id="create-modal" className="modal" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered" style={{ width: '600px' }}>
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center justify-content-center position-relative">
                        <button type="button" className="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal"></button>
                        <br />
                        <img src="../images/icon.png" alt="" height="40px" width="40px" className="mb-3" />
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            className="btn btn-primary mb-3"
                            onClick={handleUploadClick}
                        >
                            Upload Photo
                        </button>
                        
                        <textarea placeholder="Description" 
                            className="form-control mb-3" 
                            onChange={(e) => setPost({...post, description: e.target.value})}
                        />

                        <input placeholder="Location" 
                            className="form-control mb-3" 
                            onChange={(e) => setPost({...post, location: e.target.value})}
                        />
                        <select 
                            className="form-select mb-3" 
                            aria-label="Climb Type"
                            onChange={(e) => setPost({...post, climbType: e.target.value})}
                        >
                            <option value="" disabled selected>Climb Type</option>
                            <option value="Overhang">Overhang</option>
                            <option value="Slab">Slab</option>
                            <option value="Cave">Cave</option>
                        </select>

                        <input type="number" placeholder="Angle" className="form-control mb-3" 
                            onChange={(e) => setPost({...post, angle: e.target.value})}
                        />
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={handleCancel}
                                className="btn btn-secondary me-2"
                                id="wd-cancel"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePost}
                                className="btn btn-success"
                                id="wd-save"
                                data-bs-dismiss="modal"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}