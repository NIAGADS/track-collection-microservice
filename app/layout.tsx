import type { Metadata } from "next";
import { Providers } from "./provider";
import "./globals.css";

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
        <html lang="en">
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
