import { Alert, ListGroup, Modal } from "react-bootstrap";
import { useClientContext } from "../../../contexts/ClientContext";
import { CardHeading, Person, PersonDash, PersonFillGear, PinMap, Telephone } from "react-bootstrap-icons";
import { useState } from "react";

export const ClientList = (actions = true) => {
    const { clients, deleteClient } = useClientContext();

    const [showDeleteClientModal, setShowDeleteClientModal] = useState(false);
    const [showEditClientModal, setShowEditClientModal] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null)

    if (clients?.length === 0) {
        return (
            <Alert variant="info">
                Sin clientes...
            </Alert>
        );
    };

    const confirmDeleteClient = (client) => {
        console.log(client)
        setSelectedClient(null);
        setShowDeleteClientModal(false);
    }

    const confirmEditClient = (client) => {

    }

    const openDeleteClientModal = (client) => {
        setShowDeleteClientModal(true);
        setSelectedClient(client);
    }

    const openEditClietnModal = (client) => {
        setShowEditClientModal(true);
        setSelectedClient(client);
    }

    return (
        <ListGroup>
            {clients.map(client => (
                <ListGroup.Item
                    key={client.id}
                    className="small py-2"
                >
                    <div className="d-flex gap-2">
                        <div>
                            <div className="d-flex gap-2 fw-bold mb-1">
                                <Person className="align-self-center text-primary" /> {client.name}
                            </div>
                            <div className="d-flex text-muted gap-2">
                                <div style={{ whiteSpace: "nowrap" }}>
                                    <CardHeading className="align-self-center" /> {client.dniruc}
                                </div>
                                <div style={{ whiteSpace: "nowrap" }}>
                                    <Telephone className="align-self-center" /> {client?.phone}
                                </div>
                                <div className="d-flex gap-2">
                                    <div>
                                        <PinMap />
                                    </div>
                                    <div>{client?.address}</div>
                                </div>
                            </div>
                        </div>
                        {actions && (
                            <div className="d-flex gap-1">
                                <PersonDash
                                    size={24}
                                    className="text-danger cursor-pointer"
                                    onClick={() => openDeleteClientModal(client)}
                                    title="Eliminar Cliente"
                                />

                                <PersonFillGear size={24} className="text-primary" />
                            </div>
                        )}
                        {/* Modal para Eliminar */}
                        <Modal show={showDeleteClientModal} onHide={() => setShowDeleteClientModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Eliminación</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Estás seguro que deseas elimnar?
                            </Modal.Body>
                        </Modal>
                    </div>

                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}