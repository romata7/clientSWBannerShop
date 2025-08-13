import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { Pencil } from "react-bootstrap-icons";
import { useServicesContext } from "../../context/ServicesContext";

const emptyDesign = {
    id: null,
    quantity: 1,
    description: '',
    height: 0.01,
    width: 0.01,
    unit: 'cm',
    cost: 0.01
}
export const DesignModal = ({
    inputDesign,
    show,
    handleClose
}) => {
    const editMode = inputDesign?.id ? true : false;

    const [design, setDesign] = useState(editMode ? inputDesign : emptyDesign);
    const [validated, setValidated] = useState(false);

    const { dispatch } = useServicesContext();

    const title = editMode
        ? <><Pencil /> Actualizar Diseño</>
        : <><Pencil /> Registrar Diseño</>;

    const submitButtonText = editMode
        ? "Actualizar"
        : "Guardar";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDesign(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleCheckForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        editMode
            ? dispatch({ type: 'UPDATE', payload: design })
            : dispatch({ type: 'ADD', payload: design });

        handleClose();
    }
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
                            step="1"
                            name="quantity"
                            placeholder=""
                            value={design.quantity}
                            onChange={handleChange}
                            min={1}
                            required
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                            Ingrese una cantidad válida
                        </Form.Control.Feedback>
                    </FloatingLabel>
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

                    <div className="d-flex gap-2 mb-3">
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
                    <div className="d-flex text-end gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit"  >
                            {submitButtonText}
                        </Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>

    )
}