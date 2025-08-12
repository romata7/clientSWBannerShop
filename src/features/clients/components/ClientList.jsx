import { Alert, ListGroup } from "react-bootstrap";
import {
    Pencil,
    Person,
    CardHeading,
    Phone,
    PinMap,
    Trash,
    Check,
    X,
} from "react-bootstrap-icons";
import { useState } from "react";
import { useClientsContext } from "../context/ClientsContext";

export const ClientList = ({ showActions = true }) => {
    // Obtener las funciones y el estado del contexto de clientes
    const { setIsEditing, setCurrentClient, clients, removeClient } = useClientsContext();

    const [clientToDelete, setClientToDelete] = useState(null);

    // Si no hay clientes, mostrar una alerta
    if (clients?.length === 0) {
        return <Alert variant="info">Sin clientes...</Alert>;
    }

    const handleEditClient = (client) => {
        setCurrentClient(client);
        setIsEditing(true);
    };

    const handleDeleteClick = (client, e) => {
        e.stopPropagation();
        setClientToDelete(client);
    };

    const confirmDelete = async (e) => {
        e.stopPropagation();
        if (clientToDelete) {
            await removeClient(clientToDelete.id);
            setClientToDelete(null);
        }
    };

    const cancelDelete = (e) => {
        e.stopPropagation();
        setClientToDelete(null);
    };

    return (
        <ListGroup>
            {clients.map((client) => (
                <ListGroup.Item
                    key={client.id}
                    className="small py-2"
                    // Al hacer clic en un ítem, si hay una confirmación pendiente, se cierra.
                    onClick={() => setClientToDelete(null)}
                >
                    <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                            {/* Información principal del cliente */}
                            <div className="d-flex gap-2 fw-bold mb-1">
                                <Person className="align-self-center text-primary" />
                                {client.name}
                            </div>
                            <div className="d-flex text-muted gap-2 flex-wrap">
                                {/* DNI/RUC y Teléfono */}
                                <div className="d-flex gap-2 flex-nowrap">
                                    <CardHeading className="align-self-center" />
                                    {client.dniruc}
                                </div>
                                <div className="d-flex gap-2 flex-nowrap">
                                    <Phone className="align-self-center" />
                                    {client?.phone}
                                </div>
                                {/* Dirección del cliente */}
                                <div className="d-flex gap-2 flex-nowrap">
                                    <div>
                                        <PinMap />
                                    </div>
                                    <div className="flex-grow-1">
                                        {client?.address}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {showActions && (
                            <div className="d-flex gap-1 align-items-center">
                                {/* Botón de borrado */}
                                <div className="position-relative">
                                    <Trash
                                        size={20}
                                        color="red"
                                        onClick={(e) => handleDeleteClick(client, e)}
                                        role="button"
                                        title="Eliminar Cliente"
                                        style={{ cursor: "pointer" }}
                                    />
                                    {/* Alerta de confirmación */}
                                    {clientToDelete?.id === client.id && (
                                        <Alert
                                            variant="danger"
                                            className="position-absolute p-2"
                                            style={{
                                                zIndex: 1000,
                                                top: '100%', // Posiciona la alerta debajo del botón
                                                left: '50%', // Centra horizontalmente
                                                transform: 'translateX(-50%)', // Ajusta el centro horizontalmente

                                                marginTop: '5px' // Añade un pequeño margen
                                            }}
                                        >
                                            <span className="fw-bold">¿Eliminar?</span>
                                            <div className="d-flex gap-2 justify-content-center">
                                                <Check
                                                    size={24}
                                                    color="#5cb85c"
                                                    role="button"
                                                    onClick={confirmDelete}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                <X
                                                    size={24}
                                                    color="#dc3545"
                                                    role="button"
                                                    onClick={cancelDelete}
                                                    style={{ cursor: "pointer" }}
                                                />
                                            </div>
                                        </Alert>
                                    )}
                                </div>
                                {/* Botón de edición */}
                                <Pencil
                                    size={20}
                                    color="#0a6deeff"
                                    title="Editar Cliente"
                                    role="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClient(client);
                                    }}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        )}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};