import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            };
        default:
            return state;
    }

}

 export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        user: null,
        token: null
    });

    console.log('AuthProvider state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

};

