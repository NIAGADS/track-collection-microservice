"use client";
import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/*const summaryCountsCard = useMemo(() => {
    if (countsLoading) {
        return <Skeleton type="card" />;
    }
    //const data = summaryCounts.map((item: any) => ({ name: item.chromosome, data: [item.count] }));
    const categories = summaryCounts.map((item: any) => item.chromosome);
    const data = summaryCounts.map((item: any) => parseInt(item.count));
    const opts = {
        chartType: "column",
        title: "Target Genes per Chromosome",
        categories: categories,
        xAxisLabel: "Chromosome",
        yAxisLabel: "Number Targeted Genes",
    };
    return (
        <Card>
            <BarChart series={[{ data: data }]} opts={opts} />
        </Card>
    );
}, [countsLoading]); */

/* const summaryTopCard = useMemo(() => {
        if (topLoading) {
            return <Skeleton type="card" />;
        }

        const data = summaryTop.map((item: any, index: number) => ({
            y: parseFloat(item.neg_log10_pvalue),
            name: item.variant.length > 15 ? item.ref_snp_id : item.variant, // FIXME
        }));
        const categories = summaryTop.map((item: any) => item.gene_symbol);
        const opts = {
            chartType: "line",
            title: "Top QTLs",
            xAxisLabel: "Gene",
            yAxisLabel: "-log10p",
            categories: categories,
        };
        return (
            <Card>
                <GenericPlot series={[{ data: data }]} opts={opts} />
            </Card>
        );
    }, [topLoading]); */

interface ChartOptions {
    title: string;
    xAxisLabel: string;
    yAxisLabel: string;
    chartType: "bar" | "column";
    categories: string[];
}

interface ChartProps {
    series: any;
    opts: any;
}

export const BarChart = ({ series, opts }: ChartProps) => {
    const options: any = useMemo(
        () => ({
            chart: {
                type: opts.chartType,
                height: "300px",
            },
            credits: { enabled: false },
            legend: { enabled: false },
            title: {
                text: opts.title,
            },
            xAxis: {
                categories: opts.categories,
                crosshair: true,
                accessibility: {
                    description: opts.xAxisLabel,
                },
            },
            yAxis: {
                title: {
                    text: opts.yAxisLabel,
                },
            },
            series: series,
        }),
        [series]
    );
    return (
        <div className="chart-container">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};
