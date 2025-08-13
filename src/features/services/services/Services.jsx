import { Button, Container } from "react-bootstrap"
import { Easel, Pencil, Printer } from "react-bootstrap-icons"
import { DesignModal } from "../components/modals/DesignModal"
import { ImpressionsModal } from "../components/modals/ImpressionsModal"
import { ServicesProvider } from "../context/ServicesContext"
import { DesignList } from "../components/DesignList"
import { useState } from "react"


export const Services = () => {
    const [showDesignModal, setShowDesignModal] = useState(false);
    const handleShowDesignModal = () => setShowDesignModal(true);
    const handleCloseDesignModal = () => setShowDesignModal(false);

    return (
        <ServicesProvider>
            <Container className="mt-4">
                <div className="d-flex gap-2 align-self-center justify-content-center mb-3">
                    <Button onClick={ handleShowDesignModal}>
                        <Pencil /> Diseño
                    </Button>
                    <ImpressionsModal />
                   
                </div>
                {showDesignModal && (
                    <DesignModal show={showDesignModal} handleClose={handleCloseDesignModal} />
                )}
                <DesignList />
            </Container>
        </ServicesProvider>
    )
}