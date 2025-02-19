import type { Metadata } from "next";
import { Providers } from "./provider";

import "./globals.css";

export const metadata: Metadata = {
    title: "NIAGADS Template next.js Application",
    description: "https://github.com/NIAGADS/nextjs-template",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <Providers>
                {children}
                </Providers>
                </body>
        </html>
    );
}
