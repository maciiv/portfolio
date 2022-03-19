import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import { CovidData } from '../../store/Covid';
import * as d3 from 'd3';
import { Chart } from '../../assets/js/CustomMethods';

export type CovidWorldTimelineProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>;

export default class CovidWorldTimeline extends React.PureComponent<CovidWorldTimelineProps> {
    ref = React.createRef<HTMLDivElement>();
    chart: Chart;

    public componentDidMount() {
        this.renderTimeline()
    }

    private renderTimeline() {
        this.chart.margin = { top: 10, right: 30, bottom: 30, left: 60 };
        this.chart.height = this.ref.current.getBoundingClientRect().height - this.chart.margin.top - this.chart.margin.bottom;
        this.chart.width = this.ref.current.getBoundingClientRect().width - this.chart.margin.left - this.chart.margin.right;
        this.chart.y.scale = d3.scaleLinear()
            .domain([0, d3.max(this.props.location.state.data, d => d.cases)])
            .range([this.chart.height, 0]);
        this.chart.y.axis = d3.axisLeft(this.chart.y.scale);
        this.chart.x.scale = d3.scaleTime()
            .domain(d3.extent(this.props.location.state.data.map(d => new Date(d.date))))
            .range([0, this.chart.width]);
        this.chart.x.axis = d3.axisBottom(this.chart.x.scale);

        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            height = this.ref.current.getBoundingClientRect().height - margin.top - margin.bottom,
            width = this.ref.current.getBoundingClientRect().width - margin.left - margin.right;

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(this.props.location.state.data, d => d.cases)])
            .range([height, 0]);

        let xScale = d3.scaleTime()
            .domain(d3.extent(this.props.location.state.data.map(d => new Date(d.date))))
            .range([0, width]);

        let svg = this.ref.current.g
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);

        let content = svg.append("g")
            .attr("class", "content-container")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("clip-path", `url(#clip-world-timeline)`);
        content.append("rect")
            .attr("class", "zoom")
            .attr("width", width)
            .attr("height", height);
        content.append("clipPath")
            .attr("id", "clip-world-timeline")
            .append("rect")
            .attr("x", 1)
            .attr("width", width)
            .attr("height", height);

        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
            .attr("class", "x-axis")
            .call(d3.axisBottom(xScale));
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("class", "y-axis")
            .call(d3.axisLeft(yScale));

        content.selectAll("#cases")
            .data(this.props.location.state.data)
            .join(
                enter => enter.append("circle")
                    .attr("id", "cases")
                    .classed("circle", true)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("r", 5)
                    .attr("cx", d => xScale(new Date(d.date)))
                    .attr("cy", d => yScale(d.cases)),
                update => update,
                exit => exit
        );

        content.selectAll("#deaths")
            .data(this.props.location.state.data)
            .join(
                enter => enter.append("circle")
                    .attr("id", "deaths")
                    .classed("circle", true)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("r", 5)
                    .attr("cx", d => xScale(new Date(d.date)))
                    .attr("cy", d => yScale(d.deaths)),
                update => update,
                exit => exit
            );


    }

    public render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>World COVID-19 Timeline</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <div ref={this.ref} style={{ width: "100%", height: "40vh" }}>
                        <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${this.state.width + this.state.margin.left + this.state.margin.right} ${this.state.height + this.state.margin.top + this.state.margin.bottom}`}>
                        </svg>
                    </div>
                </CardBody>
            </Card>
        )
    }
}