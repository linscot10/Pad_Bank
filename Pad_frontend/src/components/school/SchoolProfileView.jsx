// src/components/school/SchoolProfileView.jsx
import React from 'react';

const SchoolProfileView = ({ school ,onEditClick }) => {
    if (!school) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <span className="ms-3">Loading school profile...</span>
        </div>
    );

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
                        <div className="card-header bg-primary-gradient py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h2 className="h5 mb-0 text-white">
                                    <i className="fas fa-school me-2"></i>
                                    School Profile
                                </h2>
                                <span className={`badge rounded-pill ${school.status === 'applied' ? 'bg-warning text-dark' :
                                    school.status === 'allocated' ? 'bg-info text-dark' :
                                        school.status === 'disbursed' ? 'bg-success' : 'bg-light text-dark'
                                    }`}>
                                    {school.status.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <div className="card-body p-4">
                            <div className="row mb-4">
                                <div className="col-md-8">
                                    <h3 className="h4 text-primary">{school.schoolName}</h3>
                                    <p className="text-muted mb-1">
                                        <i className="fas fa-map-marker-alt me-2"></i>
                                        {school.county}
                                    </p>
                                    <p className="text-muted">
                                        <i className="fas fa-envelope me-2"></i>
                                        {school.user.email}
                                    </p>
                                </div>
                                <div className="col-md-4 text-md-end">
                                    <div className="bg-light p-3 rounded-3 d-inline-block">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                                                <i className="fas fa-female text-primary fs-4"></i>
                                            </div>
                                            <div>
                                                <h4 className="mb-0 fw-bold">{school.numberOfGirls}</h4>
                                                <small className="text-muted">Number of Girls</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-4">
                                        <h5 className="h6 text-uppercase text-muted mb-3">School Information</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <span className="d-block text-muted small">County</span>
                                                <span>{school.county || 'Not specified'}</span>
                                            </li>
                                            {/* Add more fields here when available */}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="mb-4">
                                        <h5 className="h6 text-uppercase text-muted mb-3">Program Details</h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-2">
                                                <span className="d-block text-muted small">Allocated Pads</span>
                                                <span className="fw-bold">{school.allocatedPads || '0'}</span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="d-block text-muted small">Status</span>
                                                <span className={`badge ${school.status === 'applied' ? 'bg-warning text-dark' :
                                                    school.status === 'allocated' ? 'bg-info text-dark' :
                                                        school.status === 'disbursed' ? 'bg-success' : 'bg-secondary'
                                                    }`}>
                                                    {school.status}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer bg-light py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <small className="text-muted">Last updated: {new Date().toLocaleDateString()}</small>
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="fas fa-edit me-1"></i> Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolProfileView;