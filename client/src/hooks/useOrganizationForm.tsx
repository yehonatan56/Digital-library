import { useState } from 'react';
import { apiCall } from '../apiTasks/apiUtils.ts';

export const useOrganizationForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [openingHours, setOpeningHours] = useState('');

    const saveSetup1Data = (name: string, username: string, password: string, phone: string) => {
        setName(name);
        setUsername(username);
        setPassword(password);
        setPhone(phone);
        console.log('Setup 1 data saved:', { name, username, password, phone });
    };

    const saveSetup2Data = (logo: File | null) => {
        setLogo(logo);
    };

    const saveSetup3Data = (address: string, city: string, openingHours: string) => {
        setAddress(address);
        setCity(city);
        setOpeningHours(openingHours);
        console.log('Setup 3 data saved:', { address, city, openingHours });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', logo as Blob);

        const logoUrl = await apiCall('upload image', null, formData, null);

        const organizationData = {
            name,
            username,
            password,
            phone,
            logo: logoUrl,
            address,
            city,
            openingHours,
        };

        const response = await apiCall('register organization', null, organizationData, null);
        console.log(response);
    };

    return {
        saveSetup1Data,
        saveSetup2Data,
        saveSetup3Data,
        handleSubmit,
    };
};
