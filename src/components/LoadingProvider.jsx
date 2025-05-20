"use client";
import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
} from "react";
import Loading from "./Loading";

const LoadingContext = createContext(undefined);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState({ state: "none", message: "" });

    const startLoading = useCallback((state, message) => {
        setLoading({ state, message });
    }, []);

    const stopLoading = useCallback(() => {
        setLoading({ state: "none", message: "" });
    }, []);

    const value = useMemo(
        () => ({
            loading,
            startLoading,
            stopLoading,
        }),
        [loading, startLoading, stopLoading]
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
            <Loading
                state={loading.state}
                message={loading.message}
                setLoading={setLoading}
            />
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error(
            "useLoadingContext must be used within a LoadingProvider"
        );
    }
    return context;
};
