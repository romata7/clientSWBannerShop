import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap"
import { useServicesContext } from "../context/ServicesContext";

export const ServiceList = ({
    service
}) => {
    const { getServiceItems } = useServicesContext();
    const [list, setList] = useState([]);
    console.log('list de componte:', list);
    useEffect(() => {
        setList(getServiceItems(service))
    }, [service, list])
    return (
        <ListGroup>
            {list.map(item => (
                <ListGroup.Item key={item.id}>
                    <div className="d-flex">
                        {item.description}
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}