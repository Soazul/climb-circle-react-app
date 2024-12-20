import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addPost } from "../Home/reducer";
import * as client from "../Home/client";
import { ObjectId } from "bson";
import * as loginClient from "../Login/client";

interface User {
    username: string;
    role: string;
    _id: string;
};

export default function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentUser, setCurrentUser] = useState<User|null>(null);
    const fetchUser = async () => {
        const user = await loginClient.fetchCurrentUser();
        setCurrentUser(user);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const isMember = currentUser?.role === "Member";
    const initialPostState = {
        username: currentUser?.username,
        user: currentUser?._id,
        description: "",
        location: "",
        eventDate: "", 
        cost: "", 
        climbType: "",
        angle: "",
        photo: "",
        fileName: "",
        postType: "Climb",
        likes: []
    };

    const [post, setPost] = useState(initialPostState);
    const generateId = () => new ObjectId();

    const handlePost = async () => {
        try {
            const postId = generateId();
            const newPost = await client.createPost({ ...post, _id: postId });
            dispatch(addPost(newPost));
            setPost(initialPostState);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setPost(initialPostState);
        navigate(`/Home/*`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPost({ ...post, photo: imageUrl, fileName: file.name });
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.click();
        }
    };

    useEffect(() => {
        const modalElement = document.getElementById("create-modal");
        const resetFields = () => setPost(initialPostState);
        if (modalElement) {
            modalElement.addEventListener("show.bs.modal", resetFields);
        }
        return () => {
            if (modalElement) {
                modalElement.removeEventListener("show.bs.modal", resetFields);
            }
        };
    }, [initialPostState]);

    return (
        <div
            id="create-modal"
            className="modal fade"
            data-bs-backdrop="static"
            tabIndex={-1}
            aria-labelledby="create-modal-label"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="create-modal-label">Create Post</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <img src="../images/icon.png" alt="" height="40px" width="40px" className="mb-3 d-block mx-auto" />
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            className="btn btn-primary d-block mx-auto mb-3"
                            onClick={handleUploadClick}
                        >
                            Upload Photo
                        </button>
                        {post.fileName && (
                            <p className="text-center mb-2">Selected File: {post.fileName}</p>
                        )}

                        {isMember ? (
                            <>
                                <div className="mb-3">
                                    <textarea
                                        placeholder="Description"
                                        className="form-control"
                                        value={post.description}
                                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        placeholder="Location"
                                        className="form-control"
                                        value={post.location}
                                        onChange={(e) => setPost({ ...post, location: e.target.value })}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <select
                                            className="form-select"
                                            aria-label="Climb Type"
                                            value={post.climbType}
                                            onChange={(e) => setPost({ ...post, climbType: e.target.value })}
                                        >
                                            <option value="" disabled>
                                                Climb Type
                                            </option>
                                            <option value="Overhang">Overhang</option>
                                            <option value="Slab">Slab</option>
                                            <option value="Cave">Cave</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="number"
                                            placeholder="Angle"
                                            className="form-control"
                                            value={post.angle}
                                            onChange={(e) => setPost({ ...post, angle: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                           
                            <>
                                <div className="d-flex justify-content-end w-50 mb-3">
                                    <select
                                        className="form-select"
                                        aria-label="Post Type"
                                        value={post.postType}
                                        onChange={(e) => setPost({ ...post, postType: e.target.value })}
                                    >
                                        <option value="" disabled>
                                            Post Type
                                        </option>
                                        <option defaultValue="Climb">Climb</option>
                                        <option value="Event">Event</option>
                                        <option value="Sponsorship">Sponsorship</option>
                                        <option value="Merch">Merch</option>
                                    </select>
                                </div>

                                {post.postType === "Climb" && (
                                    <>
                                        <div className="mb-3">
                                            <textarea
                                                placeholder="Description"
                                                className="form-control"
                                                value={post.description}
                                                onChange={(e) => setPost({ ...post, description: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                placeholder="Location"
                                                className="form-control"
                                                value={post.location}
                                                onChange={(e) => setPost({ ...post, location: e.target.value })}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <select
                                                    className="form-select"
                                                    aria-label="Climb Type"
                                                    value={post.climbType}
                                                    onChange={(e) => setPost({ ...post, climbType: e.target.value })}
                                                >
                                                    <option value="" disabled>
                                                        Climb Type
                                                    </option>
                                                    <option value="Overhang">Overhang</option>
                                                    <option value="Slab">Slab</option>
                                                    <option value="Cave">Cave</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <input
                                                    type="number"
                                                    placeholder="Angle"
                                                    className="form-control"
                                                    value={post.angle}
                                                    onChange={(e) => setPost({ ...post, angle: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {post.postType === "Event" && (
                                <>
                                <div className="mb-3">
                                <textarea
                                    placeholder="Description"
                                    className="form-control"
                                    value={post.description}
                                    onChange={(e) => setPost({ ...post, description: e.target.value })}
                                />
                            </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <input
                                            placeholder="Location"
                                            className="form-control"
                                            value={post.location}
                                            onChange={(e) => setPost({ ...post, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="date"
                                            placeholder="Event Date"
                                            className="form-control"
                                            value={post.eventDate}
                                            onChange={(e) => setPost({ ...post, eventDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                </>
                            )}
        
                            {post.postType === "Sponsorship" && (
                                <div className="mb-3">
                                    <textarea
                                        placeholder="Description"
                                        className="form-control"
                                        value={post.description}
                                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                                    />
                                </div>
                            )}
        
                            {post.postType === "Merch" && (
                                <>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <input
                                                type="number"
                                                placeholder="Cost"
                                                className="form-control"
                                                value={post.cost}
                                                onChange={(e) => setPost({ ...post, cost: e.target.value })}
                                            />
                                        </div>
                                        
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            placeholder="Description"
                                            className="form-control"
                                            value={post.description}
                                            onChange={(e) => setPost({ ...post, description: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}
                            
                    </div>
                    <div className="modal-footer">
                        <button
                            onClick={handleCancel}
                            className="btn btn-secondary"
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
    );
}