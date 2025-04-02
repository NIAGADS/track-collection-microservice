// page.tsx

import React, { Suspense } from "react";
import { Skeleton } from "@niagads/ui";
import { Collection, APIResponse } from "@/common/types";
import { fetchCollectionMetadata, fetchTrackMetadataTable } from "@/utils/fetch";
import { TrackMetadataTable } from "@/components/TrackMetadataTable";
import { parseCollection } from "@/utils/utils";

export default async function Page() {
    const collection: Collection = await fetchCollectionMetadata(
        parseCollection(process.env.NEXT_PUBLIC_TRACK_COLLECTION!)
    );
    const metadata: APIResponse = await fetchTrackMetadataTable(collection);

    return (
        <Suspense fallback={<Skeleton type="default" />}>
            <div className="max-w-[1240px] m-auto mt-8">
                <TrackMetadataTable {...metadata} />
            </div>
        </Suspense>
    );
}
