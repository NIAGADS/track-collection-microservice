// page.tsx
'use client'
import React, { cache, Suspense } from "react";
import TrackCollectionTable from "@/component_wrappers/TrackCollectionTable";
import LoadingTable from "@/components/LoadingTable";

export default function CollectionTrackBrowser() {
    return (
        <Suspense fallback={<LoadingTable />}>
            <TrackCollectionTable />
        </Suspense>
    );
}
