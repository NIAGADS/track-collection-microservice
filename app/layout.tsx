import type { Metadata } from "next";

import { RootLayout as StandardRootLayout } from "@niagads/ui/layouts";
import NavigationConfig from "@/config/navigation.config";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "NIAGADS Track Collection Microservice",
    description:
        "track collection browser; allows you to search and mine top hits in related collections of NIAGADS or ADSP data tracks",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <StandardRootLayout navConfig={NavigationConfig} fullWidth={true}>
                    {children}
                </StandardRootLayout>
            </body>
        </html>
    );
}
