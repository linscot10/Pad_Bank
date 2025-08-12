import React, { useEffect, useState } from 'react';
import { applyForPads } from '../../services/padApplicationService';


const PadApplicationForm = ({ token, femaleStudentCount }) => {
    const [quantityRequested, setQuantityRequested] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (femaleStudentCount) {
            setQuantityRequested(femaleStudentCount);
        }
    }, [femaleStudentCount]);

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await applyForPads({ quantityRequested, reason }, token);
            alert(res.message);
            setReason('');
        } catch (error) {
            alert(error.message || 'Application failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pad-application-containe">
            <div className="application-car">
                <div className="application-heade">
                    <h2>
                        <i className="fas fa-edit"></i> Apply for Sanitary Pads
                    </h2>
                    <p className="application-subtitl">
                        Complete this form to request pads for your students
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="application-for">
                    <div className="form-grou">
                        <label htmlFor="quantityRequested">
                            <i className="fas fa-calculator"></i> Quantity Needed
                        </label>
                        <input
                            id="quantityRequested"
                            type="number"
                            value={quantityRequested}
                            onChange={e => setQuantityRequested(e.target.value)}
                            required
                            min="1"
                        />
                        <p className="form-hin">
                            Based on your {femaleStudentCount} female students
                        </p>
                    </div>

                    <div className="form-grou">
                        <label htmlFor="reason">
                            <i className="fas fa-comment-alt"></i> Justification
                        </label>
                        <textarea
                            id="reason"
                            rows="5"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            required
                            placeholder="Please explain why you need these pads and how they will be distributed..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-butto"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Processing...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-paper-plane"></i> Submit Application
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PadApplicationForm;