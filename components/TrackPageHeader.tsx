"use client";

import { cache, useEffect, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Link,
    Tooltip,
    Image,
} from "@heroui/react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

const fetchTableMetadata = cache(async (route: string, track: string) => {
    const requestUrl = `/api/${route}/track/${track}?content=full`;
    let data = null;
    try {
        const response: any = await fetch(requestUrl);
        if (response.ok) {
            data = await response.json();
        } else {
            throw new Error(
                `Error fetching track ${track} from route ${route}`
            );
        }
    } catch (error) {
        console.error(error);
    } finally {
        return data.response[0];
    }
});

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

interface Props {
    track: string;
}

function TrackPageHeader({ track }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [metadata, setMetadata] = useState<any>(null);

    useEffect(() => {
        try {
            const [route, name] =
                process.env.NEXT_PUBLIC_TRACK_COLLECTION!.split(":");
            fetchTableMetadata(route, track).then((result) =>
                setMetadata(result)
            );
        } catch (err) {
            console.error(`Error retrieving track ${track} data`);
        }
    }, [track]);

    useEffect(() => {
        if (metadata) {
            setLoading(false);
        }
    }, [metadata]);

    return (
        metadata && (
            <div className="m-6 gap-2 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4">
                <Card className="w-[400px]">
                    <CardHeader>
                        <div className="flex flex-col">
                            <p className="text-md">
                                {" "}
                                Track{" "}
                                <span className="text-2xl font-bold">
                                    {metadata.track_id}
                                </span>
                            </p>
                            <Attribute
                                label={
                                    metadata.data_category === "QTL"
                                        ? "QTL Type"
                                        : "Feature Type"
                                }
                                value={metadata.feature_type}
                                className="float-end"></Attribute>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Attribute
                            label="Source Repository"
                            value={metadata.provenance.data_source}
                        />
                        <Attribute
                            label="Accession"
                            value={metadata.provenance.accession}
                        />
                        <Attribute
                            label="Attribution"
                            value={`${metadata.provenance.attribution} // ${metadata.provenance.pubmed_id}`}
                        />
                    </CardBody>
                </Card>
                <Card className="w-[400px]">
                    <CardBody>
                        <Attribute
                            label="Biosample"
                            value={
                                metadata.biosample_characteristics
                                    .biosample_term
                            }></Attribute>
                    </CardBody>
                </Card>
                <Card className="w-[400px]">
                    <CardHeader>
                        <em>p-Value Distribution</em>
                    </CardHeader>
                    <CardBody>
                        <Image
                            src="https://dummyimage.com/250x125/5bbfe3/0011ff&text=p-value+dist"
                            alt="placeholder"></Image>
                    </CardBody>
                </Card>
            </div>
        )
    );
}

/*   <span className="text-2xl font-bold">
                                <Tooltip content="Download track data file.">
                                <Button
                                    showAnchorIcon={true}
                                    className="text-sm"
                                    size="sm"
                                    aria-label="download track file"
                                    color="primary"
                                    as={Link}
                                    href={metadata.url}>
                                    Download File
                                </Button>
                                </Tooltip>
                            </span> */

export default TrackPageHeader;
