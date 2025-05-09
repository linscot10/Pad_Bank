// src/components/School/PadApplicationForm.jsx
import React, { useEffect, useState } from 'react';
import { applyForPads } from '../../services/padApplicationService';

const PadApplicationForm = ({ token, femaleStudentCount }) => {
    const [quantityRequested, setQuantityRequested] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (femaleStudentCount) {

            setQuantityRequested(femaleStudentCount);
        }
    }, [femaleStudentCount]);

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await applyForPads({ quantityRequested, reason }, token);
        alert(res.message);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <div className="application-form-card p-5 bg-white rounded-4 shadow border">
                        <h2 className="text-center mb-4 text-primary fw-bold">📝 Apply for Pads</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="quantityRequested" className="form-label fw-semibold">Quantity Requested</label>
                                <input
                                    id="quantityRequested"
                                    type="number"
                                    className="form-control form-control-lg"
                                    placeholder="Enter quantity (e.g., 100)"
                                    value={quantityRequested}
                                    onChange={e => setQuantityRequested(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="reason" className="form-label fw-semibold">Reason</label>
                                <textarea
                                    id="reason"
                                    className="form-control form-control-lg"
                                    rows="4"
                                    placeholder="Enter reason for application"
                                    value={reason}
                                    onChange={e => setReason(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2 fw-semibold"
                            >
                                📨 Submit Application
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PadApplicationForm;
