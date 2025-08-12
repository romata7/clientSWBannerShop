import { Alert, Container } from "react-bootstrap"
import { ClientForm } from "../features/clients/components/ClientForm"
import { ClientList } from "../features/clients/components/ClientList"
import { PersonGear } from "react-bootstrap-icons"
import { useEffect, useState } from "react"
import { useClientsContext } from "../features/clients/context/ClientsContext"

export const Clients = () => {
    const { message, setMessage } = useClientsContext();
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        if (message) {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
                setMessage(null);
            }, 2000);
            return () => clearTimeout(timer); // Limpieza del timer
        }
    }, [message, setMessage]);
    return (
        <Container className="pt-4">
            {showAlert && message && (
                <Alert
                    className="position-fixed top-0 start-50 translate-middle-x mt-2 "
                    variant="info"
                    style={{ zIndex: 9999 }}
                >
                    {Object.values(message)[0]}
                </Alert>
            )}
            <h3 className="text-primary text-center"><PersonGear /> Administrar Clientes</h3>
            <ClientForm />
            <ClientList />
        </Container>
    )
}