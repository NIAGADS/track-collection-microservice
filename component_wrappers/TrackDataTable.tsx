"use client";

import { cache, useEffect, useState } from "react";
import Table from "@niagads/table";
import { Card, CardBody, Skeleton } from "@niagads/ui";

import "@niagads/table/css";
interface Row {
    [k: string]: any;
}
interface TableProps {
    id: string;
    data: Row[];
    columns: any;
    options: any;
}

const fetchTableData = cache(async (route: string, track: string) => {
    // FIXME: temporary while collection metadata queried out of FILER only
    const routeRedirect = "genomics";
    const requestUrl = `/api/${routeRedirect}/track/${track}/data?view=table`;
    let data = null;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(`Error fetching track ${track} from route ${route}`);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return data;
    }
});

interface Props {
    track: string;
}

interface TableViewResponse {
    request: any;
    pagination: any;
    response: TableProps;
}

function TrackDataTable({ track }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<TableViewResponse | null>(null);

    useEffect(() => {
        try {
            const [route, name] = process.env.NEXT_PUBLIC_TRACK_COLLECTION!.split(":");
            fetchTableData(route, track).then((result) => setData(result));
        } catch (err) {
            console.error(`Error retrieving track ${track} data`);
        }
    }, [track]);

    useEffect(() => {
        if (data) {
            data.response.options.disableColumnFilters = true; // FIXME: remove when column filters work
            setLoading(false);
        }
    }, [data]);

    return (
        <>
            {loading ? (
                <Skeleton type="table"></Skeleton>
            ) : (
                <Table
                    id={data!.response.id}
                    data={data!.response.data}
                    columns={data!.response.columns}
                    options={data!.response.options}
                />
            )}
        </>
    );
}

export default TrackDataTable;
