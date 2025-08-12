import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { Printer } from "react-bootstrap-icons";

const emptyImpression = {
    id: null,
    quantity: 1,
    description: '',
    height: 0.01,
    width: 0.01,
    unit: 'cm',
    cost: 0.01
}

export const ImpressionsModal = ({ impression: propImpression }) => {
    const isEditMode = !!propImpression;
    const initialImpresion = isEditMode ? propImpression : emptyImpression;

    const [show, setShow] = useState(false);
    const [impression, setImpression] = useState(initialImpresion);
    const [validated, setValidated] = useState(false);

    // Textos dinámicos
    const modalTitle = isEditMode ? 'Actualizar Impresión' : 'Agregar Impresión';
    const submitButtonText = isEditMode ? "Actualizar" : "Agregar";

    const handleClose = () => {
        setShow(false);
        setImpression(initialImpresion);
        setValidated(false);
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setImpression(prev => ({
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

        if (isEditMode) {
            console.log("Actualizando Impresión:", impression);
        } else {
            console.log("Creando nueva Impresión:", impression);
        };

        handleClose();
    }

    return (
        <div>
            <Button onClick={handleShow}>
                <Printer /> Impresión
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">
                            <Printer /> {modalTitle}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FloatingLabel controlId="quantity" label="Cantidad" className="mb-3">
                            <Form.Control
                                type="number"
                                step="1"
                                name="quantity"
                                value={impression.quantity}
                                onChange={handleChange}
                                min={1}
                                required
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese una cantidad válida
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="description" label="Descripción" className="mb-2">
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={impression.description}
                                onChange={handleChange}
                                required
                                style={{ height: '100px' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                La descripción es requerida
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-flex gap-2 mb-3">
                            <FloatingLabel controlId="height" label="Alto" className="flex-grow-1">
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="height"
                                    value={impression.height}
                                    onChange={handleChange}
                                    min={0.01}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un valor válido
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="width" label="Ancho" className="flex-grow-1">
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    name="width"
                                    value={impression.width}
                                    onChange={handleChange}
                                    min={0.01}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un valor válido
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            <FloatingLabel controlId="unit" label="Unidades" className="flex-grow-1">
                                <Form.Select
                                    name="unit"
                                    value={impression.unit}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="cm">Centímetros</option>
                                    <option value="m">Metros</option>
                                </Form.Select>
                            </FloatingLabel>
                        </div>

                        <FloatingLabel controlId="cost" label="Costo (S/)" className="mb-3">
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="cost"
                                value={impression.cost}
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
    );
};