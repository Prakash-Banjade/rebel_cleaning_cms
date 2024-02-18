import React, { createContext, useContext, ReactNode, useState } from 'react';

interface BreadCrumbContextProps {
    breadCrumb: string | null;
    setBreadCrumb: React.Dispatch<React.SetStateAction<string | null>>;
}

const BreadCrumbContext = createContext<BreadCrumbContextProps | undefined>(undefined);

export const useBreadCrumb = (): BreadCrumbContextProps => {
    const context = useContext(BreadCrumbContext);
    if (!context) {
        throw new Error('useBreadCrumb must be used within an BreadCrumbProvider');
    }
    return context;
};

interface BreadCrumbProviderProps {
    children: ReactNode;
}

export const BreadCrumbProvider = ({ children }: BreadCrumbProviderProps) => {
    const [breadCrumb, setBreadCrumb] = useState<string | null>(null);

    const contextValue = {
        breadCrumb,
        setBreadCrumb,
    };

    return (
        <BreadCrumbContext.Provider value={contextValue}>
            {children}
        </BreadCrumbContext.Provider>
    );
};
