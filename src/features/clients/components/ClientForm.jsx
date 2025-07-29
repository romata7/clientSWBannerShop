import { Alert, Button, FloatingLabel, Form, ListGroup, Spinner } from "react-bootstrap";
import { useClientContext } from "../../../contexts/ClientContext"
import { useEffect, useRef, useState, useCallback } from "react";

export const ClientForm = () => {
    const {
        currentClient,
        setCurrentClient,
        onSubmitClient,
        error,
        clients,
        emptyClient,
        loading,
        isEditing,
        setIsEditing
    } = useClientContext();

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isSelectingSuggestion, setIsSelectingSuggestion] = useState(false);
    const [activeField, setActiveField] = useState(null); // Nuevo estado
    const formRef = useRef(null);

    // Función de filtrado memoizada
    const filterSuggestions = useCallback((searchTerm) => {
        if (!searchTerm || searchTerm.length < 1) return [];

        const term = searchTerm.toLowerCase();
        return clients.filter(client =>
            client.name.toLowerCase().includes(term)
        ).slice(0, 10); // Limitar a 10 sugerencias máximo
    }, [clients]);

    const onChangeCleintField = useCallback((e) => {
        const { name, value } = e.target;
        setCurrentClient(prev => ({
            ...prev,
            [name]: value
        }));

        // Solo activar sugerencias si es el campo name
        if (name === 'name') {
            setIsSelectingSuggestion(false);
            setActiveField('name');
        } else {
            setShowSuggestions(false);
        }
    }, [setCurrentClient]);

    const handleSelectSuggestion = useCallback((client) => {
        setIsSelectingSuggestion(true);
        setShowSuggestions(false);
        setCurrentClient(client);
        setActiveField(null);
    }, [setCurrentClient]);

    useEffect(() => {
        if (activeField !== 'name' || isSelectingSuggestion || !currentClient?.name) {
            setShowSuggestions(false);
            return;
        }

        const timer = setTimeout(() => {
            if (currentClient.name.length > 0) {
                setSuggestions(filterSuggestions(currentClient.name));
                setShowSuggestions(true);
            } else {
                setShowSuggestions(false);
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [currentClient?.name, isSelectingSuggestion, filterSuggestions, activeField]);

    // Cerrar sugerencias al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setActiveField(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Form ref={formRef} onSubmit={onSubmitClient}>
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Campo con sugerencia */}
            <FloatingLabel controlId="name" label="Nombre/Razón Social" className="mb-3">
                <Form.Control
                    type="text"
                    name="name"
                    value={currentClient?.name || ''}
                    onChange={onChangeCleintField}
                    placeholder=""
                    required
                    autoComplete="off"
                    autoFocus
                    disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                    {error?.name}
                </Form.Control.Feedback>
                {showSuggestions && suggestions.length > 0 && (
                    <ListGroup style={{
                        zIndex: 1000,
                        position: 'absolute',
                        width: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        marginTop: '2px'
                    }}>
                        {suggestions.map(client => (
                            <ListGroup.Item
                                key={client.id}
                                action
                                onClick={() => {
                                    handleSelectSuggestion(client);
                                    setIsEditing(true);
                                }}
                                className="small py-2"
                            >
                                <div className="fw-bold">{client.name}</div>
                                <small className="text-muted">{client.dniruc}</small>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </FloatingLabel>

            <FloatingLabel controlId="dniruc" label="D.N.I/R.U.C" className="mb-3">
                <Form.Control
                    type="text"
                    name="dniruc"
                    value={currentClient.dniruc}
                    onChange={onChangeCleintField}
                    placeholder=""
                    required
                />
                <Form.Control.Feedback type="invalid">
                    {error?.dniruc}
                </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="phone" label="Teléfono/Celular" className="mb-3">
                <Form.Control
                    type="text"
                    name="phone"
                    value={currentClient.phone}
                    onChange={onChangeCleintField}
                    placeholder=""
                />
            </FloatingLabel>

            <FloatingLabel controlId="address" label="Dirección" className="mb-3">
                <Form.Control
                    type="text"
                    name="address"
                    value={currentClient.address}
                    onChange={onChangeCleintField}
                    placeholder=""
                />
            </FloatingLabel>

            <div className="d-flex gap-2 justify-content-end mt-4">
                <Button
                    variant="outline-secondary"
                    onClick={() => {
                        setCurrentClient(emptyClient)
                        setIsEditing(false)
                    }}
                    disabled={loading}
                >
                    {isEditing ? "Cancelar" : "Limpiar"}
                </Button>
                <Button
                    variant="outline-primary"
                    type="sumbit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" />
                            <span className="ms-2">Guardando...</span>
                        </>
                    ) : isEditing ? "Actualizar" : "Guardar"}
                </Button>
            </div>
        </Form>
    )
}