"use client";

import { cache, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader /*Tooltip*/ } from "@niagads/ui";

const fetchTableMetadata = cache(async (route: string, track: string) => {
    const requestUrl = `/api/${route}/track/${track}?content=full`;
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
            const [route, name] = process.env.NEXT_PUBLIC_TRACK_COLLECTION!.split(":");
            fetchTableMetadata(route, track).then((result) => setMetadata(result));
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
            <div className="m-6 gap-2 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col">
                            <p className="text-md">
                                {" "}
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
                                    value={metadata.name.split("QTL ")[metadata.name.split("QTL ").length - 1]}
                                />
                            )}
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Attribute label="Source Repository" value={metadata.provenance.data_source} />
                        <Attribute label="Accession" value={metadata.provenance.accession} />
                        <Attribute
                            label="Attribution"
                            value={`${metadata.provenance.attribution} // ${metadata.provenance.pubmed_id}`}
                        />
                        <Attribute label="Consortia" value={`${metadata.provenance.consortia}`} />
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Attribute label="Cohort(s)" value={`${metadata.cohorts}`} />
                        <Attribute
                            label="Biosample"
                            value={metadata.biosample_characteristics.biosample_term}
                        ></Attribute>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <p>form here</p>
                        {/*<Tooltip content="Retrieve the full track metadata in JSON format from the NIAGADS Open Access API">
                            <Button
                                showAnchorIcon
                                color="primary"
                                as={Link}
                                href={`/api/filer/track/${metadata.track_id}?content=full`}
                            >
                                Fetch Metadata
                            </Button>
                        </Tooltip>
                        <Form validationBehavior="aria" className="mt-2">
                            <Input label="Region" type="text" isDisabled={true} />
                            <Tooltip content="Retrieve the track data in a genomic region (gene or span) of interest from the NIAGADS Open Access API">
                                <Button showAnchorIcon type="submit" color="primary" as={Link} isDisabled={true}>
                                    Fetch Data
                                </Button>
                            </Tooltip>
                        </Form> */}
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>
                        <em>p-Value Distribution</em>
                    </CardHeader>
                    <CardBody>
                        <img
                            src="https://dummyimage.com/400x200/5bbfe3/0011ff&text=p-value+dist"
                            alt="placeholder"
                        ></img>
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
