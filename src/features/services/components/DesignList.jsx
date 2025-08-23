import { Badge, Button, ListGroup } from "react-bootstrap"
import { useServicesContext } from "../context/ServicesContext"
import { Pencil, Rulers, Trash } from "react-bootstrap-icons";

export const DesignList = () => {
    const { designs } = useServicesContext();

    if (designs.length === 0) {
        return;
    }
    return (
        <ListGroup>
            {designs.map(design => (
                <ListGroup.Item key={design.id}>
                    <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                            <div className="d-flex gap-2">
                                <div className="flex-grow-1">
                                    <div className="d-flex fw-bold gap-2">
                                        {design.quantity} x <Pencil className="align-self-center" /> {design.description}
                                    </div>
                                    <div className="d-flex text-muted gap-2 small">
                                        <Rulers className="align-self-center" /> {design.width} x {design.height} x {design.unit}
                                        <div className="fw-bold">
                                            S/{(parseFloat(design.cost)).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                <div className="align-self-center">
                                    <Badge className="fs-5">
                                        S/ {(parseFloat(design.quantity) * parseFloat(design.cost)).toFixed(2)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <Button variant="danger">
                                <Trash />
                            </Button>
                            <Button variant="warning"/>
                        </div>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}