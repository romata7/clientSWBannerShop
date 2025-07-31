import { Alert, Button, ListGroup } from "react-bootstrap";
import { useClientContext } from "../../../contexts/ClientContext";
import { CardHeading, Person, PersonDash, PersonFillGear, PinMap, Telephone, TrashFill } from "react-bootstrap-icons";
import { useState } from "react";

export const ClientList = ({ actions = true }) => {
    const { clients, deleteClient } = useClientContext();
    const [selectedClient, setSelectedClient] = useState(null);

    const handleDeleteClick = (client) => {
        setSelectedClient(selectedClient?.id === client.id ? null : client);
    };

    const confirmDelete = async () => {
        if (selectedClient) {
            await deleteClient(selectedClient.id);
            setSelectedClient(null);
        }
    };

    const cancelDelete = () => {
        setSelectedClient(null);
    };

    if (clients?.length === 0) {
        return (
            <Alert variant="info">
                Sin clientes...
            </Alert>
        );
    };

    return (
        <ListGroup>
            {clients.map(client => (
                <ListGroup.Item
                    key={client.id}
                    className="small py-2 position-relative"
                >
                    <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                            <div className="d-flex gap-2 fw-bold mb-1">
                                <Person className="align-self-center text-primary" /> {client.name}
                            </div>
                            <div className="d-flex text-muted gap-2 flex-wrap">
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
                            <div className="d-flex gap-1 align-items-center position-relative">
                                <PersonDash
                                    size={24}
                                    className={`text-danger cursor-pointer ${selectedClient?.id === client.id ? 'opacity-75' : ''}`}
                                    onClick={() => handleDeleteClick(client)}
                                    title="Eliminar Cliente"
                                />

                                <PersonFillGear 
                                    size={24} 
                                    className="text-primary cursor-pointer" 
                                    title="Editar Cliente"
                                />
                                
                                {selectedClient?.id === client.id && (
                                    <Alert
                                        variant="danger"
                                        className="position-absolute top-0 start-100 ms-2 shadow-sm"
                                        style={{ 
                                            zIndex: 1000, 
                                            width: '220px',
                                            transform: 'translateY(25%)'
                                        }}
                                    >
                                        <div className="d-flex flex-column small">
                                            <p className="mb-2 text-center">¿Eliminar {client.name}?</p>
                                            <div className="d-flex gap-2 justify-content-end">
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={confirmDelete}
                                                >
                                                    <TrashFill className="me-1" size={12} /> Sí
                                                </Button>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={cancelDelete}
                                                >
                                                    No
                                                </Button>
                                            </div>
                                        </div>
                                    </Alert>
                                )}
                            </div>
                        )}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};