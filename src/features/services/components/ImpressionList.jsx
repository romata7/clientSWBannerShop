import { useCallback, useRef, useState } from "react"
import { useServicesContext } from "../context/ServicesContext";
import { Alert, Badge, ListGroup } from "react-bootstrap";
import { Check, PencilSquare, Printer, Rulers, Trash, X } from "react-bootstrap-icons";
import { ImpressionModal } from "./modals/ImpressionModal";

export const ImpressionList = () => {
    const timerRef = useRef(null);
    const { setLocalImpression, impressions, impressionDispatch } = useServicesContext();

    const [currentAlert, setCurrentAlert] = useState({ id: null, timer: 0 });
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleEdit = useCallback((impression) => {
        setLocalImpression(impression);
        handleShowModal();
    }, []);

    if (impressions.length === 0) {
        return (
            <Alert variant="info">
                Sin Impresiones
            </Alert>
        );
    };

    const handleDeleteAlert = (i) => {
        if (timerRef.current) clearInterval(timerRef.current);

        let timer = 3;
        setCurrentAlert({ id: i.id, timer });

        timerRef.current = setInterval(() => {
            timer -= 1;
            setCurrentAlert(prev => ({ ...prev, timer }));

            if (timer <= 0) {
                clearInterval(timerRef.current);
                setCurrentAlert({ id: null, timer: 0 });
            };
        }, 1000);
    };

    function handleConfirmDelete() {
        if (currentAlert.id) {
            impressionDispatch({ type: 'REMOVE', payload: currentAlert.id });
            setLocalImpression(null);
        };
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentAlert({ id: null, timer: 0 });
    };

    function handleCancelDelete() {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentAlert({ id: null, timer: 0 });
    };

    return (
        <ListGroup>
            {impressions.map(i => (
                <ListGroup.Item key={i.id}>
                    <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                            <div className="d-flex gap-2">
                                <div className="flex-grow-1">
                                    <div className="fw-bold">
                                        <Printer /> ({i.quantity}) {i.description}
                                    </div>
                                    <div className="text-muted">
                                        <Rulers size={12} /> {i.height} x {i.width} {i.unit}
                                    </div>
                                </div>
                                <div className="text-primary align-self-center">
                                    <Badge>
                                        S/ {(parseFloat(i.quantity) * parseFloat(i.cost)).toFixed(2)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2 align-self-center position-realtive">
                            <Trash
                                role="button"
                                color="red"
                                size={18}
                                title="Eliminar"
                                onClick={() => handleDeleteAlert(i)}
                            />
                            {i.id === currentAlert.id && (
                                <Alert
                                    variant="danger"
                                    className="p-1 position-absolute botton-50 tranlate-middle-x"
                                    style={{ zIndex: 9999 }}
                                >
                                    <div className="d-flex align-items-center justify-content-between mb-e">
                                        <span className="fw-bold">¿Eliminar?</span>
                                        <span className="text-muted">({currentAlert.timer}s)</span>
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
                                onClick={() => handleEdit(i)}
                            />
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
            {showModal && (
                <ImpressionModal
                    show={showModal}
                    handleClose={handleCloseModal}
                />
            )}
        </ListGroup>
    )

}