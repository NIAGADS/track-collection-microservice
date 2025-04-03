import React, { Suspense } from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@niagads/ui";

import { BarChart } from "./BarChart";
import { GenericPlot } from "./GenericPlot";
import { fetchDataSummary, fetchTrackMetadata } from "@/utils/fetch";

interface AttributeProps {
    label: string;
    value: string | number | boolean | null;
    className?: string;
}

function Attribute({ label, value, className = "" }: AttributeProps) {
    const cName = `text_sm ${className}`;
    return (
        value && (
            <h5 className="text-sm">
                {label}: <span className="font-bold">{value}</span>{" "}
            </h5>
        )
    );
}

function TitleCard({ metadata }: any) {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col">
                    <p className="text-md">
                        Track <span className="text-2xl font-bold">{metadata.track_id}</span>
                    </p>
                    <Attribute
                        label={metadata.data_category === "QTL" ? "QTL Type" : "Feature Type"}
                        value={metadata.feature_type}
                        className="float-end"
                    ></Attribute>
                    {metadata.data_category === "QTL" && (
                        <Attribute
                            label={"Filter"}
                            value={metadata.output_type.split("QTL ")[metadata.output_type.split("QTL ").length - 1]}
                        />
                    )}
                </div>
            </CardHeader>
            <CardBody>
                <Attribute label="Source Repository" value={metadata.provenance.data_source} />
                <Attribute label="Study Name" value={metadata.study_name} />
                <Attribute label="Biosample" value={metadata.biosample_characteristics.biosample_term} />
            </CardBody>
        </Card>
    );
}

interface HeaderProps {
    track: string;
    route: string;
}

export async function TrackPageHeader({ route, track }: HeaderProps) {
    const metadata: any = await fetchTrackMetadata(route, track);
    const topResultsSummary: any = await fetchDataSummary(track, "top");
    const countSummary: any = await fetchDataSummary(track, "counts");

    return (
        <>
            <div className="m-3 gap-2 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                <Suspense fallback={<Skeleton type="card" />}>
                    <TitleCard metadata={metadata} />{" "}
                </Suspense>
                {/* barplot & scatter plot */}
            </div>
        </>
    );
}
