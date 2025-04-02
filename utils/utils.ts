import { Collection } from "@/common/types";
import { cache } from "react";

export const parseCollection = cache((collection: string) => {
    let c: Collection | undefined = undefined;
    try {
        const [route, name] = collection.split(":");
        c = { route: route, name: name } as Collection;
    } catch (err) {
        console.error(
            `Error parsing track collections: ${collection}$; 'NEXT_PUBLIC_TRACK_COLLECTION' in '.env.local' should be set to an API route:collection_name pair.`
        );
    } finally {
        return c as Collection;
    }
});