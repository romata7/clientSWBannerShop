import { useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";


export const ServiceModal = ({
    show,
    handleClose,
    service,
    fieldsConfig,
    initialData,
    onSubmit,
    operation
}) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value, type, step } = e.target;

        let parsedValue = value;
        if (type === "number") {
            parsedValue =
                step == 0.01
                    ? parseFloat(value) || 0
                    : step == 1
                        ? parseInt(value, 10) || 0
                        : value;
        }

        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    };

    const [validated, setValidated] = useState(false);

    const handleCheckForm = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        onSubmit(formData);
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{operation} {service}</Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={handleCheckForm}
                noValidate
                validated={validated}
            >
                <Modal.Body className="d-flex flex-column gap-3">
                    {fieldsConfig.map(e => (
                        <FloatingLabel
                            key={e.name}
                            controlId={e.name}
                            label={e.label}
                            aria-label={e.label}
                        >
                            {e.type === 'select'
                                ? (
                                    <Form.Select
                                        name={e.name}
                                        value={formData[fieldsConfig.name]}
                                        onChange={handleChange}
                                        required={e?.required ?? true}
                                    >
                                        {e.options?.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )
                                : (<>
                                    <Form.Control
                                        name={e.name}
                                        value={formData[e.name]}
                                        onChange={handleChange}
                                        required={e?.required ?? false}
                                        autoFocus={e?.autoFocus ?? false}
                                        placeholder=""

                                        {...(e.type === "textarea" && { as: "textarea", style: { height: "100px" } })}
                                        {...(e.type === "number" && { type: "number", step: e.step, min: e.min })}
                                        {...(e.type === "text" && { type: "text" })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {e.errorMessage || "Campo inválido"}
                                    </Form.Control.Feedback>
                                </>)
                            }
                        </FloatingLabel>
                    ))}
                    {formData.quantity && formData.cost && (
                        <div className="text-end text-primary fw-bold fs-2">
                            S/{(parseFloat(formData.quantity) * parseFloat(formData.cost)).toFixed(2)}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex text-end gap-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {operation}
                        </Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}