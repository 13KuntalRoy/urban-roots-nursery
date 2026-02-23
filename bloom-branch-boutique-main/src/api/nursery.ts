const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_BASE_URL = `${BASE_URL}/api`;
export const MEDIA_BASE_URL = BASE_URL;

export const fetchSiteConfig = async () => {
    const response = await fetch(`${API_BASE_URL}/config/`);
    if (!response.ok) throw new Error('Failed to fetch site config');
    return response.json();
};

export const fetchTrees = async () => {
    const response = await fetch(`${API_BASE_URL}/trees/`);
    if (!response.ok) throw new Error('Failed to fetch trees');
    return response.json();
};

export const fetchFeatures = async () => {
    const response = await fetch(`${API_BASE_URL}/features/`);
    if (!response.ok) throw new Error('Failed to fetch features');
    return response.json();
};

export const fetchOrderSteps = async () => {
    const response = await fetch(`${API_BASE_URL}/order-steps/`);
    if (!response.ok) throw new Error('Failed to fetch order steps');
    return response.json();
};
