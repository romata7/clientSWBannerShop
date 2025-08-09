import { createContext, useState } from 'react';
import { design } from '../features/services/serviceModels'
const BASE_URL = "http://localhost:3001/api/services";

const ServiceContext = createContext();

export const ServiceProvider = ({children}) =>{
    const [currentService, setCurrentService] = useState(null);
}