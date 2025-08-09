import { Container } from "react-bootstrap"
import { ClientForm } from "../features/clients/components/ClientForm"
import { Clipboard } from "react-bootstrap-icons"
import {Services } from "../features/services/services/Services"

export const Orders = () => {
    return (
        <Container className="pt-4">
            <h3 className="text-primary text-center"><Clipboard /> Registrar Orden</h3>
            <ClientForm showActions={false} />

            <Services />
        </Container>
    )
}