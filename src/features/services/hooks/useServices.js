import { useCallback, useReducer, useState } from "react";

export const useServices = () => {    

    const [localDesign, setLocalDesign] = useState(null);
    const [localImpression, setLocalImpression] = useState(null);

    function designsReducer(state, action) {
        switch (action.type) {
            case 'ADD':
                return [...state, { ...action.payload, id: Date.now() }];
            case 'UPDATE':
                return state.map(d =>
                    d.id === action.payload.id ? { ...d, ...action.payload } : d
                );
            case 'REMOVE':
                return state.filter(d => d.id !== action.payload);
            default:
                return state;
        }
    }
    function printsReducer(state, action) {
        switch (action.type) {
            case 'ADD':
                return [...state, { ...action.payload, id: Date.now() }];
            case 'UPDATE':
                return state.map(d =>
                    d.id === action.payload.id ? { ...d, ...action.payload } : d
                );
            case 'REMOVE':
                return state.filter(d => d.id !== action.payload);
            default:
                return state;
        }
    }

    const [designs, designDispatch] = useReducer(designsReducer, []);
    const [impressions, impressionDispatch] = useReducer(printsReducer, []);


    return {
        designs,
        impressions,
        designDispatch,
        impressionDispatch,
        localDesign,
        setLocalDesign,
        localImpression,
        setLocalImpression
    };
}