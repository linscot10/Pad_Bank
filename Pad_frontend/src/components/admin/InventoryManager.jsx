import React, { useState, useEffect } from 'react';
import { getInventory, addPads } from '../../services/adminService';
import './inventory.css'

const InventoryManager = () => {
    const [inventory, setInventory] = useState(null);
    const [newPads, setNewPads] = useState('');
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            setLoading(true);
            const data = await getInventory(token);
            setInventory(data);
        } catch (err) {
            console.error('Error fetching inventory:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPads = async () => {
        if (!newPads || isNaN(newPads) || newPads <= 0) return;

        try {
            setIsAdding(true);
            await addPads({ quantity: newPads }, token);
            setNewPads('');
            await fetchInventory();
        } catch (error) {
            console.error('Error adding pads:', error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="inventory-dashboard">
            <div className="dashboard-header">
                <h2>
                    <i className="fas fa-boxes"></i> Sanitary Pad Inventory
                </h2>
                <p className="subtitle">Manage and track pad donations and distributions</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading inventory data...</p>
                </div>
            ) : inventory ? (
                <div className="inventory-content">
                    <div className="inventory-summary">
                        <div className="summary-card donated">
                            <div className="summary-icon">
                                <i className="fas fa-hand-holding-heart"></i>
                            </div>
                            <div className="summary-details">
                                <h3>{inventory.donated || 0}</h3>
                                <p>Donated</p>
                            </div>
                        </div>

                        <div className="summary-card allocated">
                            <div className="summary-icon">
                                <i className="fas fa-tasks"></i>
                            </div>
                            <div className="summary-details">
                                <h3>{inventory.allocated || 0}</h3>
                                <p>Allocated</p>
                            </div>
                        </div>

                        <div className="summary-card disbursed">
                            <div className="summary-icon">
                                <i className="fas fa-truck"></i>
                            </div>
                            <div className="summary-details">
                                <h3>{inventory.disbursed || 0}</h3>
                                <p>Disbursed</p>
                            </div>
                        </div>

                        <div className={`summary-card ${inventory.stockAvailable < 0 ? 'stock-negative' : 'stock-available'}`}>
                            <div className="summary-icon">
                                <i className="fas fa-box-open"></i>
                            </div>
                            <div className="summary-details">
                                <h3>{inventory.stockAvailable || 0}</h3>
                                <p>Available Stock</p>
                            </div>
                        </div>
                    </div>

                    <div className="inventory-form">
                        <h3>
                            <i className="fas fa-plus-circle"></i> Add New Pads
                        </h3>
                        <div className="form-group">
                            <input
                                type="number"
                                min="1"
                                value={newPads}
                                onChange={(e) => setNewPads(e.target.value)}
                                placeholder="Enter quantity"
                                disabled={isAdding}
                            />
                            <button
                                onClick={handleAddPads}
                                disabled={!newPads || isAdding || newPads <= 0}
                            >
                                {isAdding ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i> Adding...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save"></i> Add to Inventory
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <i className="fas fa-exclamation-circle"></i>
                    <p>No inventory data available</p>
                </div>
            )}
        </div>
    );
};

export default InventoryManager;