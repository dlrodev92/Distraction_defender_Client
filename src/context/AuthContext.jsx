import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken

            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                refreshToken: null
            };
        default:
            return state;
    }

}

 export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        refreshToken: null
    });

    console.log('AuthProvider state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );

};

