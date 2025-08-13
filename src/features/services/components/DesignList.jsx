import { Alert, Badge, Button, ListGroup } from "react-bootstrap";
import { useServicesContext } from "../context/ServicesContext"
import { Check, Pencil, PencilSquare, Rulers, Trash, X } from "react-bootstrap-icons";
import { useRef, useState } from "react";
import { DesignModal } from "./modals/DesignModal";

export const DesignList = () => {
    const [currentAlert, setCurrentAlert] = useState({ id: null, timer: 0 });
    const [currentModal, setCurrentModal] = useState(null);
    const timerRef = useRef(null);
    const { designs, dispatch } = useServicesContext();

    const [currentDesign, setCurrentDesign] = useState(null)

    if (designs.length === 0) {
        return (
            <Alert variant="info">
                Sin Diseños
            </Alert>
        );
    }

    function showDeleteMessage(d) {
        // Limpiar cualquier temporizador existente
        if (timerRef.current) clearInterval(timerRef.current);

        // Iniciar nuevo temporizador
        let timer = 3;
        setCurrentAlert({ id: d.id, timer });

        timerRef.current = setInterval(() => {
            timer -= 1;
            setCurrentAlert(prev => ({ ...prev, timer }));

            if (timer <= 0) {
                clearInterval(timerRef.current);
                setCurrentAlert({ id: null, timer: 0 });
            }
        }, 1000);
    }

    function handleConfirmDelete() {
        if (currentAlert.id) {
            dispatch({ type: 'REMOVE', payload: currentAlert.id });
        }
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentAlert({ id: null, timer: 0 });
    }

    function handleCancelDelete() {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentAlert({ id: null, timer: 0 });
    }

    function handleEditDesign(d) {
        setCurrentDesign(d);
        handleShowDesignModal();
    }

    const [showDesignModal, setShowDesignModal] = useState(false);
    const handleShowDesignModal = () => setShowDesignModal(true);
    const handleCloseDesignModal = () => setShowDesignModal(false);

    return (
        <ListGroup>
            {designs.map(d => (
                <ListGroup.Item key={d.id}>
                    <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                            <div className="d-flex gap-2">
                                <div className="flex-grow-1">
                                    <div className="fw-bold">
                                        <Pencil /> ({d.quantity}) {d.description}
                                    </div>
                                    <div className="text-muted">
                                        <Rulers size={12} /> {d.height} x {d.width} {d.unit}
                                    </div>
                                </div>
                                <div className="text-primary align-self-center">
                                    <Badge>
                                        S/ {(parseFloat(d.quantity) * parseFloat(d.cost)).toFixed(2)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2 align-self-center position-relative">
                            <Trash
                                role="button"
                                color="red"
                                size={18}
                                title="Eliminar"
                                onClick={() => showDeleteMessage(d)}
                            />
                            {d.id === currentAlert.id && (
                                <Alert
                                    variant="danger"
                                    className="p-1 position-absolute bottom-50 translate-middle-x"
                                    style={{
                                        zIndex: 9999
                                    }}
                                >
                                    <div className="d-flex align-items-center justify-content-between mb-1 gap-2">
                                        <span className="fw-bold">¿Eliminar?</span>
                                        <span className="text-muted"> ({currentAlert.timer}s)</span>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-center">
                                        <Check
                                            role="button"
                                            size={18}
                                            color="green"
                                            onClick={handleConfirmDelete}
                                        />
                                        <X
                                            role="button"
                                            size={18}
                                            color="red"
                                            onClick={handleCancelDelete}
                                        />
                                    </div>
                                </Alert>
                            )}
                            <PencilSquare
                                role="button"
                                size={18}
                                title="Editar"
                                onClick={() => handleEditDesign(d)}
                            />
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
            {showDesignModal && (
                <DesignModal show={showDesignModal} handleClose={handleCloseDesignModal} design={currentDesign} />
            )}
        </ListGroup>
    )
}