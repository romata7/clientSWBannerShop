import { createContext, useContext } from "react";
import { useServices } from "../hooks/useServices";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
    const serviceData = useServices();

    return (
        <ServicesContext.Provider value={serviceData}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServicesContext = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServicesContext debe usarse dentro de un ServicesProvider');
    }
    return context;
};