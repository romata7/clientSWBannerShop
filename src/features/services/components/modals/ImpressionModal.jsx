import { useState } from "react";
import { useServicesContext } from "../../context/ServicesContext";
import { Printer } from "react-bootstrap-icons";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

const emptyPrint = {
    id: null,
    quantity: 1,
    description: "",
    height: 0.01,
    width: 0.01,
    unit: "cm",
    cost: 0.01
};

export const ImpressionModal = ({
    show,
    handleClose
}) => {
    const { localImpression, setLocalImpression, impressionDispatch } = useServicesContext();
    const editMode = localImpression?.id ? true : false;

    const [print, setPrint] = useState(editMode ? localImpression : emptyPrint);
    const [validated, setValidated] = useState(false);

    const title = editMode
        ? <><Printer /> Actualizar Impresión</>
        : <><Printer /> Registrar Impresión</>;

    const submitButtonText = editMode
        ? "Actualizar"
        : "Guardar";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrint(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        editMode
            ? impressionDispatch({ type: 'UPDATE', payload: print })
            : impressionDispatch({ type: 'ADD', payload: print });

        setLocalImpression(null);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={handleCheckForm}
                noValidate
                validated={validated}
            >
                <Modal.Body className="d-flex flex-column gap-3">
                    <FloatingLabel controlId="quantity" label="Cantidad">
                        <Form.Control
                            type="number"
                            step={1}
                            name="quantity"
                            placeholder=""
                            value={print.quantity}
                            onChange={handleChange}
                            min={1}
                            required
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese una cantidad válida
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel controlId="description" label="Descripción">
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={print.description}
                            onChange={handleChange}
                            required
                            style={{ height: '100px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            La descripción es requerida
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <div className="d-flex gap-2">
                        <FloatingLabel controlId="height" label="Alto">
                            <Form.Control
                                type="number"
                                step={0.01}
                                name="height"
                                value={print.height}
                                onChange={handleChange}
                                min={0.01}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese un valor válido
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="width" label="Ancho">
                            <Form.Control
                                type="number"
                                step={0.01}
                                name="width"
                                value={print.width}
                                onChange={handleChange}
                                min={0.01}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese un valod válido
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <FloatingLabel controlId="unit" label="Unidades">
                            <Form.Select
                                name="unit"
                                value={print.unit}
                                onChange={handleChange}
                                required
                            >
                                <option value="cm">Centímetros</option>
                                <option value="m">Metros</option>
                            </Form.Select>
                        </FloatingLabel>
                    </div>

                    <FloatingLabel controlId="cost" label="Costo">
                        <Form.Control
                            type="number"
                            step={0.01}
                            name="cost"
                            value={print.cost}
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
                    <div className="d-flex text-end gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {submitButtonText}
                        </Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}