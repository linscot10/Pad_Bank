import React, { useState, useEffect } from 'react';
import { getInventory, addPads } from '../../services/adminService';

const InventoryManager = () => {
    const [inventory, setInventory] = useState([]);
    const [newPads, setNewPads] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const data = await getInventory(token);
            // console.log(data);
            setInventory(data);
        } catch (err) {
            console.error('Error fetching inventory:', err);
        }
    };

    const handleAddPads = async () => {
        if (!newPads) return;
        await addPads({ quantity: newPads }, token);
        setNewPads('');
        fetchInventory();
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 inventory-card">
                <h3 className="text-center mb-4">Inventory Management</h3>

                <ul className="list-group mb-4">
                    {Array.isArray(inventory) && inventory.map((item) => (
                        <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span><strong>Location:</strong> {item.location}</span>
                            <span><strong>Quantity:</strong> {item.quantity}</span>
                        </li>
                    ))}
                </ul>

                <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
                    <input
                        type="number"
                        className="form-control"
                        value={newPads}
                        onChange={(e) => setNewPads(e.target.value)}
                        placeholder="Enter quantity to add"
                    />
                    <button className="btn btn-primary" onClick={handleAddPads}>Add Pads</button>
                </div>
            </div>
        </div>
    );
};

export default InventoryManager;
