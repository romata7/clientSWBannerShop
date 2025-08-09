import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { Pencil } from "react-bootstrap-icons"

const emptyDesign = {
    quantity: 1,
    description: "",
    height: "",
    width: "",
    unit: "cm",
    cost: ""
}

export const DesignModal = ({ design: propDesign }) => {
    const isEditMode = !!propDesign;
    const initialDesign = isEditMode ? propDesign : emptyDesign;

    const [show, setShow] = useState(false);
    const [design, setDesign] = useState(initialDesign);
    const [validated, setValidated] = useState(false);

    // Textos dinámicos
    const modalTitle = isEditMode ? "Actualizar Diseño" : "Agregar Diseño";
    const submitButtonText = isEditMode ? "Actualizar" : "Agregar";
    const triggerButtonText = isEditMode ? <><Pencil /> Editar</> : <><Pencil /> Diseño</>;

    const handleClose = () => {
        setShow(false);
        setDesign(initialDesign);
        setValidated(false);
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesign(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        // Aquí decides qué hacer según el modo
        if (isEditMode) {
            console.log("Actualizando diseño:", design);
            // Lógica para actualizar
        } else {
            console.log("Creando nuevo diseño:", design);
            // Lógica para crear
        }

        handleClose();
    };

    return (
        <div>
            <Button onClick={handleShow}>
                {triggerButtonText}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">
                            <Pencil /> {modalTitle}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {/* Cantidad */}
                        <FloatingLabel controlId="quantity" label="Cantidad" className="mb-3">
                            <Form.Control
                                type="number"
                                step="1"
                                name="quantity"
                                value={design.quantity}
                                onChange={handleChange}
                                min={1}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese una cantidad válida
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Descripción */}
                        <FloatingLabel controlId="description" label="Descripción" className="mb-3">
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={design.description}
                                onChange={handleChange}
                                required
                                style={{ height: '100px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                La descripción es requerida
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        {/* Dimensiones */}
                        <div className="d-flex gap-2 mb-3">
                            {/* Alto */}
                            <FloatingLabel controlId="height" label="Alto" className="flex-grow-1">
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="height"
                                    value={design.height}
                                    onChange={handleChange}
                                    min={0.01}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un valor válido
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            {/* Ancho */}
                            <FloatingLabel controlId="width" label="Ancho" className="flex-grow-1">
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="width"
                                    value={design.width}
                                    onChange={handleChange}
                                    min={0.01}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un valor válido
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            {/* Unidades */}
                            <FloatingLabel controlId="unit" label="Unidades" className="flex-grow-1">
                                <Form.Select
                                    name="unit"
                                    value={design.unit}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="cm">Centímetros</option>
                                    <option value="m">Metros</option>
                                </Form.Select>
                            </FloatingLabel>
                        </div>

                        {/* Costo */}
                        <FloatingLabel controlId="cost" label="Costo (S/)" className="mb-3">
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="cost"
                                value={design.cost}
                                onChange={handleChange}
                                min={0.01}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese un costo válido
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button variant="primary" type="submit">
                            {submitButtonText}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}