import { Alert, Button, ListGroup } from "react-bootstrap";
import { useClientContext } from "../../../contexts/ClientContext";
import { CardHeading, Check, Pencil, PencilSquare, Person, PersonDash, PersonFillGear, PersonX, Phone, PinMap, Telephone, Trash, TrashFill, X } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

export const ClientList = ({ showActions = true }) => {
    const { setIsEditing, setCurrentClient, clients, deleteClient } = useClientContext();
    const [selectedClient, setSelectedClient] = useState(null);

    const handleDeleteClient = (client, e) => {
        e.stopPropagation();
        setSelectedClient(selectedClient?.id === client.id ? null : client);
    };

    useEffect(() => {
        console.log(selectedClient);
    }, [selectedClient])

    const confirmDelete = async (e) => {
        e.stopPropagation();
        if (selectedClient) {
            await deleteClient(selectedClient.id);
            setSelectedClient(null);
        }
    };

    const cancelDelete = (e) => {
        e.stopPropagation();
        setSelectedClient(null);
    };

    const handleEditClient = (selectedClient, e) => {
        e.stopPropagation();
        if (selectedClient) {
            setCurrentClient(selectedClient);
            setIsEditing(true);
        };
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
                    className="small py-2"
                    onClick={() => setSelectedClient(null)} // Cierra el alert al hacer clic en cualquier parte del ítem
                >
                    <div className="d-flex gap-2 position-relative">
                        <div className="flex-grow-1">
                            <div className="d-flex gap-2 fw-bold mb-1">
                                <Person className="align-self-center text-primary" /> {client.name}
                            </div>
                            <div className="d-flex text-muted gap-2 flex-wrap">
                                <div style={{ whiteSpace: "nowrap" }}>
                                    <CardHeading className="align-self-center" /> {client.dniruc}
                                </div>
                                <div style={{ whiteSpace: "nowrap" }}>
                                    <Phone className="align-self-center" /> {client?.phone}
                                </div>
                                <div className="d-flex gap-2">
                                    <div>
                                        <PinMap />
                                    </div>
                                    <div>{client?.address}</div>
                                </div>
                            </div>
                        </div>

                        {showActions && (
                            <div className="d-flex gap-1 align-items-center">
                                <div className="position-relative">
                                    <Trash
                                        size={20}
                                        color="red"
                                        onClick={(e) => handleDeleteClient(client, e)}
                                        role="button"
                                        title="Eliminar Cliente"
                                    />

                                    {selectedClient?.id === client.id && (
                                        <Alert
                                            variant="danger"
                                            className="position-absolute start-0 p-2"
                                            style={{ zIndex: 1000 }}
                                        >
                                            <span className="fw-bold">¿Eliminar?</span>

                                            <div className="d-flex gap-2 justify-content-center">
                                                <Check
                                                    size={24}
                                                    style={{ color: '#5cb85c' }}
                                                    role="button"
                                                    onClick={(e) => confirmDelete(e)}
                                                />
                                                <X
                                                    size={24}
                                                    style={{ color: '#495057' }}
                                                    role="button"
                                                    onClick={() => cancelDelete}
                                                />
                                            </div>
                                        </Alert>
                                    )}
                                </div>
                                <Pencil
                                    size={20}
                                    style={{ color: '#0a6deeff' }}
                                    title="Editar Cliente"
                                    role="button"
                                    onClick={(e) => handleEditClient(client, e)}
                                />
                            </div>
                        )}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};