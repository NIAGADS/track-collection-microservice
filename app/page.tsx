// page.tsx
"use client";
import React, { cache, Suspense } from "react";
import TrackCollectionTable from "@/component_wrappers/TrackCollectionTable";
import { Skeleton } from "@niagads/ui";

export default function CollectionTrackBrowser() {
    return (
        <Suspense fallback={<Skeleton type="default" />}>
            <TrackCollectionTable />
        </Suspense>
    );
}
