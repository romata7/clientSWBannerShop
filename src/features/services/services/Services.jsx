import { Button, Container } from "react-bootstrap"
import { Easel, Pencil, Plus, Printer } from "react-bootstrap-icons"
import { DesignModal } from "../components/modals/DesignModal"

import { ServicesProvider } from "../context/ServicesContext"
import { DesignList } from "../components/DesignList"
import { useState } from "react"
import { ImpressionModal } from "../components/modals/ImpressionModal"
import { ImpressionList } from "../components/ImpressionList"


export const Services = () => {
    const [showDesignModal, setShowDesignModal] = useState(false);
    const [showImpressionModal, setShowImpressionModal] = useState(false)

    const handleShowDesignModal = () => setShowDesignModal(true);
    const handleCloseDesignModal = () => setShowDesignModal(false);

    const handleShowImpressionModal = () => setShowImpressionModal(true);
    const handleCloseImpressionModal = () => setShowImpressionModal(false);

    return (
        <ServicesProvider>
            <Container className="mt-4">
                <div className="d-flex gap-2 align-self-center justify-content-center mb-3">
                    <Button onClick={handleShowDesignModal}>
                        <Plus /> <Pencil /> Diseño
                    </Button>
                    <Button onClick={handleShowImpressionModal}>
                        <Plus /> <Printer /> Impresión
                    </Button>

                </div>
                {showDesignModal && (
                    <DesignModal show={showDesignModal} handleClose={handleCloseDesignModal} />
                )}
                {showImpressionModal && (
                    <ImpressionModal show={showImpressionModal} handleClose={handleCloseImpressionModal} />
                )}
                <div className="d-flex flex-column gap-3">
                    <DesignList />
                    <ImpressionList />
                </div>
            </Container>
        </ServicesProvider>
    )
}