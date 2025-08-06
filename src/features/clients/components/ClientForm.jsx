import { Alert, Button, Container, FloatingLabel, Form, ListGroup, Spinner } from "react-bootstrap";
import { useClientContext } from "../../../contexts/ClientContext"
import { useEffect, useRef, useState, useCallback } from "react";
import { ClientFields } from "./ClientFields";
import { ClientActions } from "./ClientActions";
import { ClientList } from "./ClientList";

export const ClientForm = () => {
    const {
        setCurrentClient,
        onSubmitClient,
        error,
        emptyClient,
        loading,
        isEditing,
        setIsEditing
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