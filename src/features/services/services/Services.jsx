import { Button, Container } from "react-bootstrap"
import { Easel, Pencil, Printer } from "react-bootstrap-icons"
import { DesignModal } from "./DesignModal"

export const Services = () => {
    return (
        <Container className="mt-4">
            <div className="d-flex gap-2 align-self-center justify-content-center">
                <DesignModal />
                <Button>
                    <Printer /> Impresión
                </Button>
                <Button>
                    <Printer /> Instalación
                </Button>
                <Button>
                    <Printer /> Mantenimiento
                </Button>
            </div>
        </Container>
    )
}