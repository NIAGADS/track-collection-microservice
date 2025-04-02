"use client";
import { useEffect, useMemo, useState } from "react";

import { DataTableMeta } from "@/config/metadata.config";
import { APIResponse } from "@/common/types";

import { Alert, Button, Skeleton } from "@niagads/ui";
import Table from "@niagads/table";
import "@niagads/table/css";

export function TrackDataTable({ response, pagination, request }: APIResponse) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedRow, setSelectedRow] = useState<string | undefined>(undefined);

    const renderPaginationMessage = useMemo(() => {
        const endpoint = request.endpoint;
        return (
            <Alert variant="warning" message="Large Result Size">
                <div>
                    <p>
                        This query returns <span className="font-semibold">{pagination.total_num_records}</span>{" "}
                        results. The top {pagination.paged_num_records} results are displayed. Additional pages of the
                        result can be retrieved using the NIAGADS Open Access API.
                    </p>
                    <p className="mt-2">
                        <a
                            className="ui-link"
                            href={`${process.env.NEXT_PUBLIC_NIAGADS_API_HOST}${endpoint}?&page=1`}
                            target="_blank"
                        >
                            {process.env.NEXT_PUBLIC_NIAGADS_API_HOST}
                            {endpoint}?page=1
                        </a>
                    </p>
                </div>
            </Alert>
        );
    }, [pagination, request]);

    const onRowSelect = (rowSelection: any) => {
        if (!isLoading) {
            const target: string = Object.keys(rowSelection)[0];
            setSelectedRow(target);
        }
    };

    useEffect(() => {
        console.log(selectedRow);
    }, [selectedRow]);

    useEffect(() => {
        if (response) {
            if (response.options) {
                response.options.disableColumnFilters = true; // FIXME: remove when column filters work
            } else {
                response.options = { disableColumnFilters: true };
            }

            const rowSelectOpts = {
                header: "Select",
                onRowSelect: onRowSelect,
                description: "extract or view all QTLs targeting the selected gene",
                rowId: "target_ensembl_id",
            };

            response.options.rowSelect = rowSelectOpts;

            setIsLoading(false);
        }
    }, [response.options]);

    return (
        <>
            {isLoading ? (
                <Skeleton type="table"></Skeleton>
            ) : (
                <>
                    {pagination.total_num_records > pagination.paged_num_records && renderPaginationMessage}
                    <div className="m-3 flex flex-row gap-4">
                        <Button variant="primary" disabled={selectedRow === undefined ? true : false}>
                            View on Genome Browser
                        </Button>
                        <Button variant="primary" disabled={selectedRow === undefined ? true : false}>
                            Fetch all associated QTLs
                        </Button>
                        <p className="self-center">{DataTableMeta.rowSelectDescription}</p>
                    </div>

                    <Table {...response} />
                </>
            )}
        </>
    );
}
