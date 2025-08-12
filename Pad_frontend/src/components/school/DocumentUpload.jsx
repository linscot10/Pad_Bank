import React, { useState } from 'react';
import { uploadDocuments } from '../../services/schoolService';

const DocumentUpload = ({ token }) => {
    const [files, setFiles] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!files || files.length === 0) return;
        
        setIsUploading(true);
        try {
            const formData = new FormData();
            for (let file of files) {
                formData.append('documents', file);
            }
            const res = await uploadDocuments(formData, token);
            alert(res.message);
            setFiles(null);
        } catch (error) {
            alert(error.message || 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-light">
                <h5 className="mb-0">
                    <i className="fas fa-file-upload me-2 text-primary"></i>
                    Upload Student Documents
                </h5>
            </div>
            <div className="card-body">
                <div className="mb-4">
                    <label htmlFor="fileUpload" className="form-label fw-semibold">
                        <i className="fas fa-file-alt me-2"></i>
                        Choose Documents (PDF, JPG, etc.)
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        className="form-control"
                        multiple
                        onChange={e => setFiles(e.target.files)}
                    />
                </div>

                {files && (
                    <div className="mb-3">
                        <h6>Selected Files:</h6>
                        <ul className="list-group">
                            {Array.from(files).map((file, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{file.name}</span>
                                    <small className="text-muted">{Math.round(file.size / 1024)} KB</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    className="btn btn-success w-100 py-2 fw-semibold"
                    onClick={handleUpload}
                    disabled={!files || isUploading}
                >
                    {isUploading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Uploading...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-upload me-2"></i>
                            Upload Documents
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DocumentUpload;