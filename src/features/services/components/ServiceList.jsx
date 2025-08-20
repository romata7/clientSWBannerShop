import { ListGroup } from "react-bootstrap"

export const ServiceList = ({ list, icon, keys = [] }) => {
    const Icon = icon ? icon : '';
    if (list.length === 0) {
        return;
    }
    return (
        <ListGroup className="mb-3">
            {list.map(item => (
                <ListGroup.Item key={item.id}> {/* Usa el ID real del item */}
                    <div className="fw-bold">
                        {item.quantity} x {Icon && <Icon />} {item.description}
                    </div>
                    <div className="d-flex gap-3 text-muted small">
                        {keys.map(k => (
                            <span key={`${item.id}-${k}`}> {/* Key única por campo */}
                                {k.toUpperCase()}: {item[k]}
                            </span>
                        ))}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}