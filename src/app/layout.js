"use client";

import { Provider } from "react-redux";
import Layout from "@/components/Layout";
import "./styles/globals.css";
import { store } from "../redux/store";

export default function RootLayout({ children }) {
    return (
        <Provider store={store}>
            <html lang="en">
            <body>
            <Layout>{children}</Layout>
            </body>
            </html>
        </Provider>
    );
}
