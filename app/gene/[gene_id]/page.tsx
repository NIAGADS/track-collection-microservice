// gene/[gene_id]/page.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import GeneDataTable from "@/component_wrappers/GeneDataTable";
import { useParams, useSearchParams } from "next/navigation";
import GenePageHeader from "@/components/GenePageHeader";
import { GeneTableMeta } from "@/config/metadata.config";

export default function TrackDataPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const geneId = useParams<{ gene_id: string }>().gene_id;
    const trackId = useSearchParams().get("track");

    // TODO: missing required parameter

    useEffect(() => {
        setLoading(!loading);
    }, [geneId]);

    return (
        <>
            {/*<GenePageHeader track={params.track_id} />*/}
            <div className="m-4 py-4 border-b border-primary">
                <h1 className="font-bold text-3xl">{GeneTableMeta.title}</h1>
            </div>
            <GeneDataTable track={trackId!} gene={geneId} />
        </>
    );
}
