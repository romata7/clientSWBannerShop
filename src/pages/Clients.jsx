import { Container } from "react-bootstrap"
import { ClientForm } from "../features/clients/components/ClientForm"
import { ClientList } from "../features/clients/components/ClientList"
import { PersonGear } from "react-bootstrap-icons"

export const Clients = () => {
    return (
        <Container className="pt-4">
            <h3 className="text-primary text-center"><PersonGear /> Administrar Clientes</h3>
            <ClientForm />
            <ClientList />
        </Container>
    )
}