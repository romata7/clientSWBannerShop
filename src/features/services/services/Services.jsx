import { Button, Container } from "react-bootstrap";
import { ServicesProvider } from "../context/ServicesContext";
import { ServiceModal } from "../components/ServiceModal";
import { SERVICES_CONFIG } from "../model/modelConfig";
import { useState } from "react";
import { Plus } from "react-bootstrap-icons";

export const Services = () => {
    const [activeModal, setActiveModal] = useState(null);

    const handleOpenModal = (serviceType) => {
        setActiveModal(serviceType);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    const onSubmit = (data) => {
        console.log(data);
        handleCloseModal();
    };

    return (
        <ServicesProvider>
            <Container className="mt-4">
                <div className="d-flex gap-2 align-self-center justify-content-center mb-3">
                    {Object.entries(SERVICES_CONFIG).map(([key, config]) => {
                        const Icon = config.icon;
                        return (
                            <Button 
                                key={key} 
                                onClick={() => handleOpenModal(key)}
                            >
                                <Plus /> <Icon /> {config.name}
                            </Button>
                        );
                    })}
                </div>

                {/* Renderiza solo el modal activo */}
                {activeModal && SERVICES_CONFIG[activeModal] && (
                    <ServiceModal
                        show={!!activeModal}
                        handleClose={handleCloseModal}
                        service={SERVICES_CONFIG[activeModal].name}
                        fieldsConfig={SERVICES_CONFIG[activeModal].fields}
                        initialData={SERVICES_CONFIG[activeModal].emptyData}
                        onSubmit={onSubmit}
                        operation="Agregar"
                    />
                )}

                <div className="d-flex flex-column gap-3">
                    {/* Tus listas de servicios (DesignList, ImpressionList, etc.) */}
                </div>
            </Container>
        </ServicesProvider>
    );
};