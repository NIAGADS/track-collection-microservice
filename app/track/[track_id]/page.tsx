// track/[track_id]/page.tsx
import React, { Suspense } from "react";

import { Collection, APIResponse } from "@/common/types";
import {
    fetchCollectionMetadata,
    fetchTrackDataTable,
    fetchTrackMetadata,
    fetchTrackMetadataTable,
} from "@/utils/fetch";
import { DataTableMeta } from "@/config/metadata.config";
import { Skeleton } from "@niagads/ui";
import { TrackDataTable } from "@/components/TrackDataTable";
import { useParams } from "next/navigation";
import { parseCollection } from "@/utils/utils";

export default async function Page() {
    const params = useParams<{ track_id: string }>();
    const collection: Collection = parseCollection(process.env.NEXT_PUBLIC_TRACK_COLLECTION!);
    // FIXME - temporary until we get collections sorted out, querying genomics is hard coded
    const data: APIResponse = await fetchTrackDataTable("genomics", params.track_id);
    const metadata: any = await fetchTrackMetadata(collection.route, params.track_id);

    const summaryTypes = [];

    return (
        <>
            {/*<TrackPageHeader {..metadata} />*/}
            <div className="m-4 py-4 border-b border-primary">
                <h1 className="font-bold text-3xl">{DataTableMeta.title}</h1>
            </div>
            <Suspense fallback={<Skeleton type="table" />}>
                <TrackDataTable {...data} />
            </Suspense>
        </>
    );
}
