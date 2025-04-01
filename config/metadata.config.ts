interface Meta {
    title?: string,
    description?: string;
    rowSelectDescription?: string;
}

export const DataTableMeta: Meta = {
    title: "Top QTL per Targeted Gene",
    rowSelectDescription: "Select a row in the table below to explore the data in the selected gene region on a genome browser."
}

export const GeneTableMeta: Meta = {
    title: "QTLs targeting this Gene"
}
