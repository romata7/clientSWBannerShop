import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

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
    const [data, setData] = useState(initialData);
    const [validated, setValidated] = useState(false);

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
                step == 0.01
                    ? parseFloat(value) || 0
                    : step == 1
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
                <Modal.Body className="d-flex flex-column gap-2">
                    <FloatingLabel controlId="quantity" label="Cantidad">
                        <Form.Control
                            type="number"
                            step={1}
                            value={data.quantity}
                            onChange={handleChange}
                            placeholder=""
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Cantidad debe ser Mayor a 1
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="description" label="Descripción">
                        <Form.Control
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
                        <div className="col-md-4">
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

                        <div className="col-md-4">
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

                        <div className="col-md-4">
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
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <FloatingLabel controlId="cost" label="Costo">
                                <Form.Control
                                    type="number"
                                    step={0.01}
                                    value={data.cost}
                                    onChange={handleChange}
                                    placeholder=""
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese costo x diseño
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </div>
                        <div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="text-end">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        {operation}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}