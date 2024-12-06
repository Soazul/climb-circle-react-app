import { FaHeart } from 'react-icons/fa';

export default function PostModal({ username, location, description, angle, photo, likes }: { username: string | null, location: string | null, description: string | null, angle: number | null, photo: string | null, likes: number | null }) {
    return (
        <div id="post-modal" className="modal fade" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="w-100 text-center">
                            <h5><strong>{username}</strong></h5>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
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
                                        <textarea className="form-control" id="description" rows={2} value={description || ''}></textarea>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12">
                                        <label htmlFor="location" className="form-label">Location</label>
                                        <input type="text" className="form-control" id="location" value={location || ''}/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6">
                                        <label htmlFor="climbType" className="form-label">Climb Type</label>
                                        <select className="form-select" id="climbType">
                                            <option value="Slab">Slab</option>
                                            <option value="Overhang">Overhang</option>
                                            <option value="Cave">Cave</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="angle" className="form-label">Angle</label>
                                        <input type="number" className="form-control" id="angle" defaultValue={angle || ''}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}