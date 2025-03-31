import React from "react";

import { Button, Alert } from "@niagads/ui";

export default function Home() {
    return (
        <>
            <Alert message="NIAGADS Next.js Template" variant="info">
                <p>
                    If @niagads/ui and tailwindcss are working, a (dark) navigation menu and{" "}
                    <span className="font-bold">INFO</span> (blue) alert should be rendered.
                </p>
            </Alert>
        </>
    );
}
