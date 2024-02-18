import React, { createContext, useContext, ReactNode, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
    accessToken: string | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface DecodedAuth {
    email: string,
    fullname: string,
    id: string,
}

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useDecodedAuth = (): DecodedAuth => {
    const { accessToken } = useAuth();
    if (!accessToken) throw new Error('No access token found');
    const decoded: DecodedAuth = jwtDecode(accessToken);
    return decoded
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const contextValue = {
        accessToken,
        setAccessToken,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
