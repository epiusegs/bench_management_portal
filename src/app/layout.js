"use client";

import { Provider } from "react-redux";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import "./styles/globals.css";
import { store } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <AuthProvider>
                <ProtectedLayout>{children}</ProtectedLayout>
            </AuthProvider>
        </Provider>
        </body>
        </html>
    );
}

function ProtectedLayout({ children }) {
    const { user } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!user) {
            router.push("/auth/login");
        }
    }, [user, router]);

    if (!isClient) return null;

    return <Layout>{children}</Layout>;
}
