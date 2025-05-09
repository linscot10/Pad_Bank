import React, { useState } from 'react';
import { uploadDocuments } from '../../services/schoolService';

const DocumentUpload = ({ token }) => {
    const [files, setFiles] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        for (let file of files) {
            formData.append('documents', file);
        }
        const res = await uploadDocuments(formData, token);
        alert(res.message);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-10">
                    <div className="upload-card p-5 bg-white rounded-4 shadow border">
                        <h2 className="text-center mb-4 text-success fw-bold">📎 Upload Student Documents</h2>

                        <div className="mb-4">
                            <label htmlFor="fileUpload" className="form-label fw-semibold">Choose Documents (PDF, JPG, etc.)</label>
                            <input
                                id="fileUpload"
                                type="file"
                                className="form-control"
                                multiple
                                onChange={e => setFiles(e.target.files)}
                            />
                        </div>

                        <button
                            className="btn btn-success w-100 py-2 fw-semibold"
                            onClick={handleUpload}
                            disabled={!files}
                        >
                            📤 Upload Documents
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DocumentUpload;