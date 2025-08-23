import { Button, Container } from "react-bootstrap";
import { useServicesContext } from "../context/ServicesContext";
import { ServiceModal } from "../components/ServiceModal";
import { SERVICES_CONFIG } from "../model/modelConfig";
import { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { DesignList } from "../components/DesignList";

export const Services = () => {
    const [activeModal, setActiveModal] = useState(null);

    const {
        getServiceDispatch,
        getServiceItems
    } = useServicesContext();

    const handleOpenModal = (serviceType) => {
        setActiveModal(serviceType);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    const onSubmit = (data) => {
        const dispatch = getServiceDispatch(activeModal);
        const { id, ...restData } = data;

        dispatch({
            type: id ? 'UPDATE' : 'ADD',
            payload: id
                ? { ...restData, id }
                : { ...restData, id: Date.now() }
        });

        handleCloseModal();
    };

    return (
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

            {activeModal && SERVICES_CONFIG[activeModal] && (
                <ServiceModal
                    show={!!activeModal}
                    handleClose={handleCloseModal}
                    service={SERVICES_CONFIG[activeModal].name}
                    fieldsConfig={SERVICES_CONFIG[activeModal].fields}
                    initialData={SERVICES_CONFIG[activeModal].emptyData}
                    icon={SERVICES_CONFIG[activeModal].icon}
                    onSubmit={onSubmit}
                    operation="Agregar"
                />
            )}

            <div className="d-flex flex-column">
                <DesignList />
            </div>
        </Container>
    );
};