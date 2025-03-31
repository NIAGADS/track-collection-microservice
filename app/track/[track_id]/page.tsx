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
            <TrackDataTable track={params.track_id} />
        </>
    );
}
