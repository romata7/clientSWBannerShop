import { Button, Spinner } from "react-bootstrap"
import { useClientContext } from "../../../contexts/ClientContext"

export const ClientActions = () => {
    const { setCurrentClient, isEditing, setIsEditing, emptyClient, loading } = useClientContext();
    return (
        <div className="d-flex gap-2 justify-content-end mb-3">
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
    )
}