import {
    Form,
    Button,
    Spinner,
    ListGroup,
    FloatingLabel,
} from "react-bootstrap";
import {
    Person,
    CardHeading,
} from "react-bootstrap-icons";
import { useCallback, useRef, useState, useEffect } from "react";
import { useClientsContext } from "../context/ClientsContext";

const emptyClient = {
    id: null,
    name: "",
    dniruc: "",
    phone: "",
    address: ""
};

export const ClientForm = ({ showActions = true }) => {
    // Obtiene el estado y las funciones del contexto del cliente
    const {
        clients,
        loading,
        saveClient,
        updateClient,
        localClient,
        setLocalClient,
    } = useClientsContext();

    const editMode = localClient?.id ? true : false;

    // Estado local para gestionar las sugerencias    
    const [client, setClient] = useState(editMode ? localClient : emptyClient);

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);

    const suggestionsRef = useRef(null);
    const nameInputRef = useRef(null);

    const onSubmitClient = async (e) => {
        e.preventDefault();
        try {
            const { id, ...restClient } = client;
            if (editMode) {
                await updateClient(id, restClient);
            } else {
                await saveClient(client);
            };
            setLocalClient(null);
        } catch (err) {
            console.log(err)
        }
    }

    // Filtra las sugerencias basándose en el valor del campo de nombre
    const filterSuggestions = useCallback(
        (searchTerm) => {
            if (!searchTerm || searchTerm.length < 1) return [];
            const term = searchTerm.toLowerCase();
            return clients
                .filter((client) => client.name.toLowerCase().includes(term))
                .slice(0, 10);
        },
        [clients]
    );

    // Maneja los cambios en los campos del formulario
    const onChangeClientField = useCallback(
        (e) => {
            const { name, value } = e.target;
            setClient((prev) => ({
                ...prev,
                [name]: value,
            }));

            // Si el campo es 'name', actualiza las sugerencias
            if (name === "name") {
                setIsSelectingSuggestion(false);
                const filtered = filterSuggestions(value);
                setSuggestions(filtered);
                setShowSuggestions(filtered.length > 0);
            }
        },
        [setClient, filterSuggestions]
    );

    // Maneja la selección de una sugerencia
    const selectSuggestion = useCallback(
        (client) => {
            setClient(client);
            setShowSuggestions(false);
            setIsSelectingSuggestion(true);
        },
        [setClient]
    );

    // Oculta las sugerencias al hacer clic fuera del componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                nameInputRef.current &&
                !nameInputRef.current.contains(event.target) &&
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Form onSubmit={onSubmitClient}>
            <>
                <FloatingLabel
                    controlId="name"
                    label="Nombre/Razón social"
                    className="mb-3 position-relative"
                    ref={nameInputRef}
                >
                    <Form.Control
                        type="text"
                        name="name"
                        value={client.name}
                        onChange={onChangeClientField}
                        // Simplifica el manejador de onFocus ya que filterSuggestions
                        // maneja correctamente el caso de un string vacío.
                        onFocus={() => {
                            const filtered = filterSuggestions(client.name);
                            setSuggestions(filtered);
                            setShowSuggestions(filtered.length > 0);
                        }}
                        placeholder=""
                        autoComplete="off"
                        required
                    />
                    {/* Muestra las sugerencias si es necesario */}
                    {showSuggestions && (
                        <ListGroup
                            className="position-absolute start-0 w-auto shadow-sm"
                            style={{ zIndex: 1000 }}
                            ref={suggestionsRef}
                        >
                            {suggestions.map((client) => (
                                <ListGroup.Item
                                    key={client.id}
                                    action
                                    onClick={() => selectSuggestion(client)}
                                >
                                    <div className="d-flex gap-2">
                                        <Person className="align-self-center text-primary" />
                                        <span className="flex-grow-1">{client.name}</span>
                                        <CardHeading className="align-self-center text-primary ms-4" />
                                        <small className="text-muted">{client.dniruc}</small>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </FloatingLabel>

                <FloatingLabel controlId="dniruc" label="D.N.I/R.U.C" className="mb-3">
                    <Form.Control
                        type="text"
                        name="dniruc"
                        value={client.dniruc}
                        onChange={onChangeClientField}
                        placeholder=""
                        required
                    />
                </FloatingLabel>

                <FloatingLabel controlId="phone" label="Teléfono/Celular" className="mb-3">
                    <Form.Control
                        type="text"
                        name="phone"
                        value={client.phone}
                        onChange={onChangeClientField}
                        placeholder=""
                    />
                </FloatingLabel>

                <FloatingLabel controlId="address" label="Dirección" className="mb-3">
                    <Form.Control
                        type="text"
                        name="address"
                        value={client.address}
                        onChange={onChangeClientField}
                        placeholder=""
                    />
                </FloatingLabel>
            </>

            {/* Botones de acción, solo se muestran si showActions es true */}
            {
                showActions && (
                    <div className="d-flex gap-2 justify-content-end mb-3">
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                setClient(emptyClient);
                                setLocalClient(null);
                            }}
                            disabled={loading}
                        >
                            {editMode ? "Cancelar" : "Limpiar"}
                        </Button>
                        <Button
                            variant="outline-primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" />
                                    <span className="ms-2">Guardando...</span>
                                </>
                            ) : editMode ? (
                                "Actualizar"
                            ) : (
                                "Guardar"
                            )}
                        </Button>
                    </div>
                )
            }
        </Form >
    );
};
