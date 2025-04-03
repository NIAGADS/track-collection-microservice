"use client";
import React, { useEffect, useState } from "react";
import Table from "@niagads/table";
import { APIResponse } from "@/common/types";
import { Skeleton } from "@niagads/ui";

import "@niagads/table/css";

const DEFAULT_COLUMNS = [
    "track_id",
    "name",
    "feature_type",
    "study_name",
    "biosample_term",
    "number_of_intervals",
    "bp_covered",
];

export function TrackMetadataTable({ data, pagination, request }: APIResponse) {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (data) {
            if (data.options) {
                data.options.defaultColumns = DEFAULT_COLUMNS;
                data.options.disableColumnFilters = true; // FIXME: remove when column filters work
            } else {
                data.options = { defaultColumns: DEFAULT_COLUMNS, disableColumnFilters: true };
            }

            setIsLoading(false);
        }
    }, [data.options]);

    return isLoading ? <Skeleton type="table" /> : <Table {...data} />;
}
