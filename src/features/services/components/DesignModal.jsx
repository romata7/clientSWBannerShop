import { useState, useEffect } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Floppy, Gear, Pencil, Trash } from "react-bootstrap-icons";

const emptyData = {
    id: null,
    quantity: 1,
    description: "",
    width: 0.00,
    height: 0.00,
    unit: 'cm',
    cost: 0.00,
};

export const DesignModal = ({ show, handleClose, initialData = emptyData, operation = "Registrar" }) => {
    const isDeleteOperation = operation === "Eliminar";
    const variant = operation === "Eliminar"
        ? "danger"
        : operation === "Actualizar"
            ? "warning"
            : "primary";
    const Icon = operation === "Eliminar"
        ? Trash
        : operation === "Actualizar"
            ? Gear
            : Floppy;

    const [data, setData] = useState(initialData);
    const [validated, setValidated] = useState(false);

    // Agrega useEffect para actualizar el estado cuando cambien las props
    useEffect(() => {
        setData(initialData);
    }, [initialData, show]);

    const handleCheckForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        };
        //tratar datos
        handleClose();
    }

    const handleChange = (e) => {
        const { name, value, type, step } = e.target;

        let parsedValue = value;
        if (type === "number") {
            parsedValue =
                step === "0.01" // Cambiado a === y comillas
                    ? parseFloat(value) || 0
                    : step === "1" // Cambiado a === y comillas
                        ? parseInt(value) || 0
                        : value;
        };
        setData(prev => ({ ...prev, [name]: parsedValue }));
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Pencil /> {operation} Diseño
                </Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={handleCheckForm}
                noValidate
                validated={validated}
            >
                <fieldset disabled={isDeleteOperation}>
                    <Modal.Body className="d-flex flex-column gap-2">
                        {/* Descripción - AGREGADO name */}
                        <FloatingLabel controlId="description" label="Descripción">
                            <Form.Control
                                name="description" // Agregado name
                                type="text"
                                value={data.description}
                                onChange={handleChange}
                                placeholder=""
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Complete la descripción
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="row g-2 align-items-end">
                            <div className="col-4">
                                <FloatingLabel controlId="width" label="Ancho">
                                    <Form.Control
                                        name="width"
                                        type="number"
                                        step={0.01}
                                        value={data.width}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese ancho de diseño
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </div>

                            <div className="col-4">
                                <FloatingLabel controlId="height" label="Alto">
                                    <Form.Control
                                        name="height"
                                        type="number"
                                        step={0.01}
                                        value={data.height}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese alto de diseño
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </div>

                            <div className="col-4">
                                <FloatingLabel controlId="unit" label="Unidades">
                                    <Form.Select
                                        name="unit"
                                        value={data.unit}
                                        onChange={handleChange}
                                    >
                                        <option value='cm'>cm</option>
                                        <option value='m'>m</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </div>
                        </div>

                        <div className="row g-2 align-items-end">
                            <div className="col-4">
                                <FloatingLabel controlId="quantity" label="Cantidad">
                                    <Form.Control
                                        name="quantity" // Agregado name
                                        type="number"
                                        step={1}
                                        value={data.quantity}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                        min="1"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Cantidad debe ser Mayor a 1
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div className="col-4">
                                <FloatingLabel controlId="cost" label="Costo (S/)">
                                    <Form.Control
                                        name="cost" // Agregado name
                                        type="number"
                                        step={0.01}
                                        value={data.cost}
                                        onChange={handleChange}
                                        placeholder=""
                                        required
                                        min="0"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese costo x diseño
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </div>
                            <div className="col-4">
                                <div className="fw-bold align-self-center text-primary text-center">
                                    <div className="d-flex flex-column">
                                        <div>
                                            Total:
                                        </div>
                                        <div>
                                            S/{(parseInt(data.quantity) * parseFloat(data.cost)).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </fieldset>
                <Modal.Footer className="text-end">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant={variant}>
                        <Icon /> {operation}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}