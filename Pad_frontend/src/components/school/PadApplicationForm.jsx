// src/components/School/PadApplicationForm.jsx
import React, { useEffect, useState } from 'react';
import { applyForPads } from '../../services/padApplicationService';

const PadApplicationForm = ({ token, femaleStudentCount }) => {
    const [quantityRequested, setQuantityRequested] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (femaleStudentCount) {
            // Assuming you want to request 1 pad per female student as default
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
            <div className="application-form-card p-4 bg-white rounded shadow-sm">
                <h2 className="text-center mb-4">Apply for Pads</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="quantityRequested" className="form-label">Quantity Requested</label>
                        <input
                            id="quantityRequested"
                            type="number"
                            className="form-control"
                            placeholder="Enter quantity"
                            value={quantityRequested}
                            onChange={e => setQuantityRequested(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group mt-3">
                        <label htmlFor="reason" className="form-label">Reason</label>
                        <textarea
                            id="reason"
                            className="form-control"
                            placeholder="Enter reason for application"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mt-4">Apply</button>
                </form>
            </div>
        </div>
    );
};

export default PadApplicationForm;
