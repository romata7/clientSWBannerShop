import { Alert, Container, Form } from "react-bootstrap";
import { useClientContext } from "../../../contexts/ClientContext"
import { ClientFields } from "./ClientFields";
import { ClientActions } from "./ClientActions";
import { ClientList } from "./ClientList";

export const ClientForm = () => {
    const {
        onSubmitClient,
        error
    } = useClientContext();

    return (
        <Container>
            <Form onSubmit={onSubmitClient}>
                {error && <Alert variant="danger">{error}</Alert>}
                <ClientFields />

                <ClientActions />

                <ClientList />
            </Form>
        </Container>
    )
}