"use client"
import React, { cache, useEffect, useMemo, useState } from "react"
import Table, {TableProps} from "@bug_sam/table";
import { Collection } from "@/common/types";

type RESPONSE_TYPE = 'collection-listing' | 'track-listing'

// http://localhost:8000/filer/collection/?xqtl-project
const fetchCollectionInformation = cache(
    async (collection: Collection, responseType: RESPONSE_TYPE) => {
        const queryString = responseType === 'collection-listing' ? `?${collection.name}` : `/${collection.name}?view=table`
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
export const fetchCollectionMetadata = cache(
    async (collection: Collection) => {
        const response: any = await fetchCollectionInformation(collection, 'collection-listing' )
        const match =  response.find((c: any) => c.name.toLowerCase() == collection.name.toLowerCase());
        Object.assign(collection, {label: match.name, description: match.description})
        return collection
    }
);



export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);
    const [collection, setCollection ] = useState<Collection|null>(null);
    const [trackTable, setTrackTable] = useState<TableProps|null>(null);
    
    useEffect(() => {
        try {
            console.log(process.env.NEXT_PUBLIC_TRACK_COLLECTION);
            const [route, name] = process.env
                .NEXT_PUBLIC_TRACK_COLLECTION!.split(":");
            fetchCollectionMetadata( { route: route, name: name } as Collection).then((result) => setCollection(result))
        } catch (err) {
            console.error(
                "Error parsing track collections; NEXT_PUBLIC_TRACK_COLLECTION (set in application .env file);   an API route:collection_name pair."
            );
        }
    }, []);

    
    useEffect(() => {
        collection && fetchCollectionInformation(collection, 'track-listing').then((result) => setTrackTable(result))
    }, [collection])

    // or useMemo?
    //{ type: "link", url: string, tooltip?: string }>>
    const tableData = useMemo(() => {
        if (trackTable) {
            const trackPkColIndex:number = trackTable.columns.findIndex((c: any) => c.id == process.env.NEXT_PUBLIC_TRACK_PK_FIELD)
            return trackTable.data.map((row: any) => row.map((cell: any, index: number) => (
                index == trackPkColIndex ? cell : Object.assign(cell, {type: 'link', 'url': `/track/${cell.value}`}))));
        }
        else {
            return null;
        }
    }, [trackTable?.data])

    
    return tableData && <Table data={tableData} columns={trackTable!.columns} id={trackTable!.id} options={trackTable!.options}/>

}
