import { Gear, Pencil, Printer, Tools } from "react-bootstrap-icons";

export const SERVICES_CONFIG = {
    design: {
        icon: Pencil,
        name: "Diseño",
        fields: [
            {
                name: "quantity",
                label: "Cantidad",
                type: "number",
                min: 1,
                step: 1,
                required: true,
                autoFocus: true
            },
            {
                name: "description",
                label: "Descripción",
                type: "textarea",
                required: true,
                errorMessage: "La descripción es obligatoria"
            },
            {
                name: "height",
                label: "Alto",
                type: "number",
                step: 0.01,
                min: 0.01,
                required: true
            },
            {
                name: "width",
                label: "Ancho",
                type: "number",
                step: 0.01,
                min: 0.01,
                required: true
            },
            {
                name: "unit",
                label: "Unidades",
                type: "select",
                required: true,
                options: [
                    { value: "cm", label: "Centímetros" },
                    { value: "m", label: "Metros" }
                ]
            },
            {
                name: "cost",
                label: "Costo (S/)",
                type: "number",
                step: 0.01,
                min: 0.01,
                required: true
            }
        ],
        emptyData: {
            id: null,
            quantity: 1,
            description: '',
            height: 0.01,
            width: 0.01,
            unit: 'cm',
            cost: 0.01
        }
    },
    impression: {
        icon: Printer,
        name: "Impresion",
        fields: [
            {
                name: "quantity",
                label: "Cantidad",
                type: "number",
                min: 1,
                step: 1,
                required: true,
                autoFocus: true
            },
            {
                name: "description",
                label: "Descripción",
                type: "textarea",
                required: true,
                errorMessage: "La descripción es obligatoria"
            },
            {
                name: "height",
                label: "Alto",
                type: "number",
                step: 0.01,
                min: 0.01,
                required: true
            },
            {
                name: "width",
                label: "Ancho",
                type: "number",
                step: 0.01,
                min: 0.01,
                required: true
            },
            {
                name: "unit",
                label: "Unidades",
                type: "select",
                required: true,
                options: [
                    { value: "cm", label: "Centímetros" },
                    { value: "m", label: "Metros" }
                ]
            },
            {
                name: "cost",
                label: "Costo (S/)",
                type: "number",
                step: 0.01,
                min: 0.01,
                required: true
            }
        ],
        emptyData: {
            id: null,
            quantity: 1,
            description: '',
            height: 0.01,
            width: 0.01,
            unit: 'cm',
            cost: 0.01
        }
    },
    installation: {
        icon: Tools,
        name: "Instalación",
        fields: [
            {
                name: "quantity",
                label: "Cantidad",
                type: "number",
                min: 1,
                step: 1,
                required: true,
                autoFocus: true
            },
            {
                name: "description",
                label: "Descripción del trabajo",
                type: "textarea",
                required: true
            },
            {
                name: "hours",
                label: "Horas estimadas",
                type: "number",
                min: 1,
                step: 0.5,
                required: true
            },
            {
                name: "complexity",
                label: "Complejidad",
                type: "select",
                options: [
                    { value: "low", label: "Baja" },
                    { value: "medium", label: "Media" },
                    { value: "high", label: "Alta" }
                ]
            },
            {
                name: "cost",
                label: "Costo estimado (S/)",
                type: "number",
                min: 0.01,
                step: 0.01,
                required: true
            }
        ],
        emptyData: {
            id: null,
            quantity: 1,
            description: '',
            hours: 1,
            complexity: 'medium',
            cost: 0.01
        }
    },
    maintenance: {
        icon: Gear,
        name: "Mantenimiento",
        fields: [
            {
                name: "quantity",
                label: "Cantidad",
                type: "number",
                min: 1,
                step: 1,
                required: true,
                autoFocus: true
            },
            {
                name: "description",
                label: "Problema reportado",
                type: "textarea",
                required: true
            },
            {
                name: "type",
                label: "Tipo de mantenimiento",
                type: "select",
                options: [
                    { value: "preventive", label: "Preventivo" },
                    { value: "corrective", label: "Correctivo" },
                    { value: "emergency", label: "Emergencia" }
                ],
                required: true
            },
            {
                name: "cost",
                label: "Costo estimado (S/)",
                type: "number",
                min: 0.01,
                step: 0.01
            }
        ],
        emptyData: {
            id: null,
            quantity: 1,
            description: '',
            type: 'preventive',
            cost: 0.01
        }
    }
};