import React, { forwardRef, useImperativeHandle, useState } from 'react';
//import './registerOrganization.css';
const OrganizationForm = forwardRef(function (_props, ref) {
    const [address, setAddress] = useState('123 Main St');
    const [city, setCity] = useState('New York');
    const [openingHours, setOpeningHours] = useState('9:00 AM - 5:00 PM');

    useImperativeHandle(ref, () => ({
        triggerSubmit: () => {
            return handleSubmit(new Event('submit') as any); // simulate submit event
        },
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!address || !city || !openingHours) {
            console.error('All fields are required');
            return false;
        }
        // Handle form submission logic here
        console.log('Form submitted:', { address, city, openingHours });
        return { address, city, openingHours };
    };
    return (
        <div>
            <h1>Organization Details</h1>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="openingHours" className="form-label">
                        Opening Hours
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="openingHours"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
});

export default OrganizationForm;
