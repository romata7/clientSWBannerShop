import { Badge, Button, ListGroup } from "react-bootstrap"
import { useServicesContext } from "../context/ServicesContext"
import { Pencil, PencilSquare, Rulers, Trash } from "react-bootstrap-icons";
import { DesignModal } from "./DesignModal";
import { useState } from "react";

export const DesignList = () => {
    const { designs } = useServicesContext();

    const [show, setShow] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [operation, setOperation] = useState("Registrar");


    const handleEdit = (data) => {
        setInitialData(data);
        setShow(true);
        setOperation('Actualizar');
    };

    const handleDelete = (data => {
        setInitialData(data);
        setShow(true);
        setOperation("Eliminar");
    })

    const handleClose = () => {
        setInitialData(null);
        setShow(false);
        setOperation("");
    };

    if (designs.length === 0) {
        return;
    }
    return (
        <ListGroup>
            {designs.map(design => (
                <ListGroup.Item key={design.id}>
                    <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                            <div className="d-flex gap-2">
                                <div className="flex-grow-1">
                                    <div className="d-flex fw-bold gap-2">
                                        {design.quantity} x <Pencil className="align-self-center" /> {design.description}
                                    </div>
                                    <div className="d-flex text-muted gap-2 small">
                                        <Rulers className="align-self-center" /> {design.width} x {design.height} x {design.unit}
                                        <div className="fw-bold">
                                            S/{(parseFloat(design.cost)).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <div className="align-self-center">
                                    <Badge>
                                        S/ {(parseFloat(design.quantity) * parseFloat(design.cost)).toFixed(2)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <Trash
                                className="align-self-center"
                                color="red"
                                role="button"
                                title="Eliminar"
                                onClick={() => handleDelete(design)}
                            />
                            <PencilSquare
                                className="align-self-center"
                                role="button"
                                title="Modificar"
                                onClick={() => handleEdit(design)}
                            />

                        </div>
                    </div>
                </ListGroup.Item>
            ))}
            {show && (
                <DesignModal
                    show={show}
                    initialData={initialData}
                    operation={operation}
                    handleClose={handleClose}
                />
            )}
        </ListGroup>
    )
}