import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { Pencil } from "react-bootstrap-icons"

export const DesignModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button onClick={handleShow}>
                <Pencil /> Diseño
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center"><Pencil /> Agregar Diseño</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose} >
                        Guardar cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}