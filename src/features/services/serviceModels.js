import { Easel } from "react-bootstrap-icons"

export const design = {
    header: 'Diseño',
    icon: Easel,
    fields: {
        quantity: {
            type: 'number',
            step: '1',
            require: true
        },
        description: {
            type: "text",
            required: true
        },
        height: {
            type: 'number',
            step: '0.01',
            require: true
        },
        width: {
            type: 'number',
            step: '0.01',
            require: true
        },
        cost: {
            type: 'number',
            step: '0.01',
            require: true
        }
    },
    empty: {
        quantity: 1,
        description: "",
        height: 1.00,
        width: 1.00,
        cost: 1.00,
    }
}