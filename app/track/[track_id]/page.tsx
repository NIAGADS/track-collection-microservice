// track/[track_id]/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import TrackDataTable from "@/component_wrappers/TrackDataTable";
import { useParams } from "next/navigation";
import TrackPageHeader from "@/components/TrackPageHeader";

export default function TrackDataPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams<{ track_id: string }>();

    useEffect(() => {
        setLoading(!loading);
    }, [params.track_id]);

    return (
        <>
            <TrackPageHeader track={params.track_id} />
            <div className="m-4">
                <h1 className="font-bold text-3xl">Most significant QTLs</h1>
            </div>
            <TrackDataTable track={params.track_id} />
        </>
    );
}
