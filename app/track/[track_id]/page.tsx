// track/[track_id]/page.tsx
import React, { Suspense } from "react";
import { useParams } from "next/navigation";

import { Skeleton } from "@niagads/ui";

import { Collection, APIResponse } from "@/common/types";
import { fetchTrackDataTable, fetchTrackMetadata } from "@/utils/fetch";
import { DataTableMeta } from "@/config/metadata.config";
import { TrackDataTable } from "@/components/TrackDataTable";
import { TrackPageHeader } from "@/components/TrackPageHeader";
import { parseCollection } from "@/utils/utils";

export default async function Page() {
    const trackId = useParams<{ track_id: string }>().track_id;
    const collection: Collection = parseCollection(process.env.NEXT_PUBLIC_TRACK_COLLECTION!);
    // FIXME - temporary until we get collections sorted out, querying genomics is hard coded
    const data: APIResponse = await fetchTrackDataTable("genomics", trackId);

    return (
        <>
            <TrackPageHeader route={collection.route} track={trackId} />
            <div className="m-4 py-4 border-b border-primary">
                <h1 className="font-bold text-3xl">{DataTableMeta.title}</h1>
            </div>
            <Suspense fallback={<Skeleton type="table" />}>
                <TrackDataTable {...data} />
            </Suspense>
        </>
    );
}
