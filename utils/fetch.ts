import { cache } from "react";
import { APIResponse } from "@/common/types";
import { Collection } from "@/common/types";


export const fetchTrackDataTable = cache(async (route: string, track: string) => {
    const requestUrl = `/api/${route}/track/${track}/data?view=table`;
    let data: APIResponse | undefined = undefined;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Error fetching data for track ${track} from route ${route}`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return data as APIResponse;
    }
});

export const fetchTrackMetadataTable = cache(async (collection: Collection) => {
    const requestUrl = `/api/${collection.route}/collection/${collection.name}?view=table`;
    let data: APIResponse | undefined = undefined;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Error fetching collection track metadata for collection ${collection.name} from route ${collection.route}`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        // create the track link outs
        if (data && data.data) {
            for (const c of data?.data.columns) {
                if (c.id == "track_id") {
                    Object.assign(c, { type: "link" });
                }
            }
            for (const t of data.data.data) {
                Object.assign(t, {
                    track_id: {
                        value: t.track_id,
                        type: "link",
                        url: `track/${t.track_id}`,
                        tooltip: "Explore the track data",
                    },
                });
            }
        }
        return data as APIResponse;
    }
});


export const fetchCollectionMetadata = cache(async (collection: Collection) => {
    const requestUrl = `/api/${collection.route}/collection`;
    let data = null;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Error fetching metadata for collection ${collection.name} from route ${collection.route}`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        const match = data.find((c: any) => c.name.toLowerCase() == collection.name.toLowerCase());
        Object.assign(collection, {
            label: match.name,
            description: match.description,
        });
        return collection as Collection;
    }
});


export const fetchTrackMetadata = cache(async (route: string, track: string) => {
    const requestUrl = `/api/${route}/track/${track}`;
    let data = null;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Error fetching metadata for track ${track} from route ${route}`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return data.data
    }
});


// no route needed here b/c only genomics will have summaries
export const fetchDataSummary = cache(async (track: string, type: string) => {
    const requestUrl = `/api/genomics/track/${track}/data/summary/${type}`;
    let data = null;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Error fetching track ${track} ${type} summary`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return data.data;
    }
});
