import { Person } from "react-bootstrap-icons";

export const clientModel = {
    name: 'client',
    header: 'Cliente',
    icon: Person,
    empty: {
        id: null,
        name: "",
        dniruc: "",
        phone: "",
        address: ""
    },
    fields: {
        name: {
            type: "text",
            required: true,
            suggestions: true
        },
        dniruc: {
            type: "text",
            require: true
        },
        phone: {
            type: 'text'
        },
        address: {
            type: 'text'
        }
    }
}