import { Button, Container } from "react-bootstrap"
import { Easel, Pencil, Printer } from "react-bootstrap-icons"
import { DesignModal } from "../components/modals/DesignModal"
import { ImpressionsModal } from "../components/modals/ImpressionsModal"

export const Services = () => {
    return (
        <Container className="mt-4">
            <div className="d-flex gap-2 align-self-center justify-content-center">
                <DesignModal />
                <ImpressionsModal />
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