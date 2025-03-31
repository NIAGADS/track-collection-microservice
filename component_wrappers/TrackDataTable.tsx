"use client";

import { cache, useEffect, useMemo, useState } from "react";
import Table from "@niagads/table";
import { Alert, Card, CardBody, Skeleton } from "@niagads/ui";

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

    /*  "request_id": "329627b1a9ea911d03dfaa7a3fa8505c",
    "endpoint": "/genomics/track/NGFGXQTL0000005/data",
    "parameters": {
      "view": "table",
      "track": "NGFGXQTL0000005",
      "page": 1
    },*/
    const renderPaginationMessage = useMemo(() => {
        return loading ? null : (
            <Alert variant="warning" message="Large Result Size">
                <div>
                    <p>
                        This query returns <span className="font-semibold">{data!.pagination.total_num_records}</span>{" "}
                        results. The top {data!.pagination.paged_num_records} results are displayed. Additional pages of
                        the result can be retrieved using the NIAGADS Open Access API.
                    </p>
                    <p className="mt-2">
                        <a
                            className="ui-link"
                            href={`${process.env.NEXT_PUBLIC_API_HOST}${data!.request.endpoint}?&page=1`}
                            target="_blank"
                        >
                            {process.env.NEXT_PUBLIC_API_HOST}
                            {data!.request.endpoint}?page=1
                        </a>
                    </p>
                    {/*<p className="mt-1">
                        To retrieve the results as tab-delimited text, set{" "}
                        <span className="font-semibold">format=TEXT</span>.
                    </p>*/}
                </div>
            </Alert>
        );
    }, [loading]);

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
                <>
                    {data!.pagination.total_num_records > data!.pagination.paged_num_records && renderPaginationMessage}
                    <Table
                        id={data!.response.id}
                        data={data!.response.data}
                        columns={data!.response.columns}
                        options={data!.response.options}
                    />
                </>
            )}
        </>
    );
}

export default TrackDataTable;
