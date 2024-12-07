import { FaHeart } from 'react-icons/fa';
import {useState} from "react";

export default function PostModal({location, description, climbType, angle, photo, likes, isEditing, onClose }: { username: string | null, location: string | null, description: string | null, climbType: string | null, angle: number | null, photo: string | null, likes: number | null, isEditing: boolean, onClose: () => void}) {
    
    const [descriptionState, setDescriptionState] = useState(description || "");
    const [locationState, setLocationState] = useState(location || "");
    const [climbTypeState, setClimbTypeState] = useState(climbType || "");
    const [angleState, setAngleState] = useState(angle || 0);
    console.log(location, description, climbType, angle, photo, likes);

    return (
        <div className="modal fade show" style={{ display: 'block' }} role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="d-flex">
                            <div className="me-3" style={{width: '250px', height: '250px', position: 'relative'}}>
                                {photo && ( <img src={photo} alt="" className="img-fluid" style={{width: '100%', height: '100%', objectFit: 'cover'}}/>)}
                                <div className="d-flex align-items-center" style={{position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '16px'}}>
                                    <FaHeart color="red" className="me-1" />
                                    <span>{likes !== null ? likes : 0}</span>
                                </div>
                            </div>                   
                            <div className="flex-grow-1">
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" rows={2} value={descriptionState} onChange={(e) => setDescriptionState(e.target.value)} disabled={!isEditing}></textarea>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input type="text" className="form-control" id="location" value={locationState} onChange={(e) => setLocationState(e.target.value)} disabled={!isEditing}/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label htmlFor="climbType" className="form-label" >Climb Type</label>
                                        <select className="form-select" id="climbType" value={climbTypeState} onChange={(e) => setClimbTypeState(e.target.value)} disabled={!isEditing}>
                                            <option value="Slab">Slab</option>
                                            <option value="Overhang">Overhang</option>
                                            <option value="Cave">Cave</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="angle" className="form-label">Angle</label>
                                        <input type="number" className="form-control" id="angle" value={angleState} onChange={(e) => setAngleState(Number(e.target.value))} disabled={!isEditing}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isEditing && (
                        <div className="modal-footer">
                            <button className='btn btn-success'>Save</button>
                            <button className='btn btn-danger'>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}