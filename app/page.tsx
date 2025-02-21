"use client";
import React, { cache, Suspense, useEffect, useMemo, useState } from "react";
import Table from "@bug_sam/table";
import { Collection } from "@/common/types";
import { Card, Skeleton } from "@heroui/react";

type RESPONSE_TYPE = "collection-listing" | "track-listing";

const fetchCollectionInformation = cache(
    async (collection: Collection, responseType: RESPONSE_TYPE) => {
        const queryString =
            responseType === "collection-listing"
                ? `?${collection.name}`
                : `/${collection.name}?view=table`;
        const requestUrl = `/api/${collection.route}/collection${queryString}`;
        let data = null;
        try {
            const response: any = await fetch(requestUrl);
            if (response.ok) {
                data = await response.json();
                data = data.response;
            } else {
                throw new Error(`Error fetching collection ${collection}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            return data;
        }
        // TODO: catch the error
    }
);

// TODO: error handling
export const fetchCollectionMetadata = cache(async (collection: Collection) => {
    const response: any = await fetchCollectionInformation(
        collection,
        "collection-listing"
    );
    const match = response.find(
        (c: any) => c.name.toLowerCase() == collection.name.toLowerCase()
    );
    Object.assign(collection, {
        label: match.name,
        description: match.description,
    });
    return collection;
});

interface Row {
    [k: string]: any;
}
interface TableProps {
    id: string;
    data: Row[];
    columns: any;
    options: any;
}

function LoadingTable() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="w-[30ch] h-[1.25rem]" />
                <Skeleton className="w-[45ch] h-[1rem]" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[30ch] h-[1.25rem]" />
                <Skeleton className="w-[45ch] h-[1rem]" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-[30ch] h-[1.25rem]" />
                <Skeleton className="w-[45ch] h-[1rem]" />
            </div>
        </div>
    );
}

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [collection, setCollection] = useState<Collection | null>(null);
    const [trackTable, setTrackTable] = useState<TableProps | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        try {
            console.log(process.env.NEXT_PUBLIC_TRACK_COLLECTION);
            const [route, name] =
                process.env.NEXT_PUBLIC_TRACK_COLLECTION!.split(":");
            fetchCollectionMetadata({
                route: route,
                name: name,
            } as Collection).then((result) => setCollection(result));
        } catch (err) {
            console.error(
                "Error parsing track collections; NEXT_PUBLIC_TRACK_COLLECTION (set in application .env file);   an API route:collection_name pair."
            );
        }
    }, []);

    useEffect(() => {
        collection &&
            fetchCollectionInformation(collection, "track-listing").then(
                (result) => setTrackTable(result)
            );
    }, [collection]);

    useEffect(() => {
        if (trackTable) {
            for (const c of trackTable.columns) {
                if (c.id == "track_id") {
                    Object.assign(c, { type: "link" });
                }
            }
            for (const t of trackTable.data) {
                Object.assign(t, {
                    track_id: {
                        value: t.track_id,
                        type: "link",
                        url: `/track/${t.track_id}`,
                        tooltip: "get track data",
                    },
                });
            }
            setIsLoaded(true);
        }
    }, [trackTable]);

    return (
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
            <Suspense
                fallback={<LoadingTable/>}>
                <Table
                    data={trackTable!.data}
                    columns={trackTable!.columns}
                    id={trackTable!.id}
                    options={trackTable!.options}
                />
            </Suspense>
        </Card>
    );
}
