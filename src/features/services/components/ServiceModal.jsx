import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";

export const ServiceModal = ({
    show,
    handleClose,
    service,
    fieldsConfig,
    initialData,
    onSubmit,
    operation,
    icon
}) => {
    const [formData, setFormData] = useState(initialData);

    const Icon = icon || ""

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
        try {
            onSubmit(formData);
            handleClose();
        } catch (error) {
            console.error('Error al enviar el formario:', error);
        }
    }

    useEffect(() => {
        if (show) {
            setFormData(initialData);
            setValidated(false);
        }
    }, [])
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><Icon /> {operation} {service}</Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={handleCheckForm}
                noValidate
                validated={validated}
            >
                <Modal.Body className="d-flex flex-column gap-3">
                    {fieldsConfig.map(fieldConfig => (
                        <FloatingLabel
                            key={fieldConfig.name}
                            controlId={fieldConfig.name}
                            label={fieldConfig.label}
                            aria-label={fieldConfig.label}
                        >
                            {fieldConfig.type === 'select'
                                ? (
                                    <Form.Select
                                        name={fieldConfig.name}
                                        value={formData[fieldConfig.name] || ''}
                                        onChange={handleChange}
                                        required={fieldConfig?.required ?? true}
                                    >
                                        {fieldConfig.options?.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )
                                : (<>
                                    <Form.Control
                                        name={fieldConfig.name}
                                        value={formData[fieldConfig.name]}
                                        onChange={handleChange}
                                        required={fieldConfig?.required ?? false}
                                        autoFocus={fieldConfig?.autoFocus ?? false}
                                        placeholder=""

                                        {...(fieldConfig.type === "textarea" && { as: "textarea", style: { height: "100px" } })}
                                        {...(fieldConfig.type === "number" && { type: "number", step: fieldConfig.step, min: fieldConfig.min })}
                                        {...(fieldConfig.type === "text" && { type: "text" })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {fieldConfig.errorMessage || "Campo inválido"}
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