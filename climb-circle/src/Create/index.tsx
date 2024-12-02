export default function Create() {
    return (
        <div id="create-modal" className="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-dialog-centered" style={{ width: '600px' }}>
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center justify-content-center position-relative">
                        <button type="button" className="btn-close position-absolute top-0 end-0 m-2" data-bs-dismiss="modal"></button>
                        <br />
                        <img src="../images/icon.png" alt="" height="40px" width="40px" className="mb-3" />
                        <h4 className="mb-3">Username</h4>
                        <button type="button" className="btn btn-primary btn-lg mb-3">Upload Photo</button>
                        <input placeholder="Title" className="form-control mb-3" />
                        <input placeholder="Location" className="form-control mb-3 " />
                        <textarea placeholder="Description" className="form-control mb-3" />
                        <select className="form-select mb-3" aria-label="Climb Type">
                            <option value="" disabled selected>Climb Type</option>
                            <option value="overhang">Overhang</option>
                            <option value="slab">Slab</option>
                            <option value="cave">Cave</option>
                        </select>
                        <input type="number" placeholder="Angle" className="form-control mb-3" />
                    </div>
                </div>
            </div>
        </div>
    );
}
