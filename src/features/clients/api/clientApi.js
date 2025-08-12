import axios from "axios";

const BASE_URL = 'http://localhost:3001/api/clients';

export const getClients = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getClient = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const postClient = async (clientData) => {
    const response = await axios.post(BASE_URL, clientData);
    return response.data;
};

export const putClient = async (id, clientData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, clientData);
    return response.data;
};

export const deleteClient = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};