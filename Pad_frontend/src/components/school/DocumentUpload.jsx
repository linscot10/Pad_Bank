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
            <div className="upload-card p-4 bg-white rounded shadow-sm">
                <h2 className="text-center mb-4">Upload Student Documents</h2>
                <div className="form-group">
                    <label htmlFor="fileUpload" className="form-label">Choose Documents</label>
                    <input
                        id="fileUpload"
                        type="file"
                        className="form-control-file"
                        multiple
                        onChange={e => setFiles(e.target.files)}
                    />
                </div>
                <button
                    className="btn btn-primary w-100 mt-3"
                    onClick={handleUpload}
                    disabled={!files}
                >
                    Upload Documents
                </button>
            </div>
        </div>
    );
};

export default DocumentUpload;