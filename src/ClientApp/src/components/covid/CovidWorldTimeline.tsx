import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle, Spinner } from 'reactstrap';
import { CovidData } from '../../store/Covid';
import * as d3 from 'd3';
import { ChartMargin } from '../../assets/js/CustomMethods';
import ContentContainer, { ContentContainerProps } from '../d3_components/ContentContainer';
import Axis, { AxisProps } from '../d3_components/Axis';
import Circle, { CircleProps } from '../d3_components/Circle';
import Line, { LineData, LineProps } from '../d3_components/Line';
import Area, { AreaData, AreaProps } from '../d3_components/Area';

export type CovidWorldTimelineProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>;

export default class CovidWorldTimeline extends React.PureComponent<CovidWorldTimelineProps, {
    width: number,
    height: number,
    margin: ChartMargin,
    scaleX: d3.ScaleTime<number, number, never>,
    scaleYCases: d3.ScaleLinear<number, number, never>,
    scaleYHosp: d3.ScaleLinear<number, number, never>,
    scaleYDeaths: d3.ScaleLinear<number, number, never>,
    isLoading: boolean
}> {
    ref = React.createRef<HTMLDivElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 30, bottom: 30, left: 80 } as ChartMargin,
        scaleX: {} as d3.ScaleTime<number, number, never>,
        scaleYCases: {} as d3.ScaleLinear<number, number, never>,
        scaleYHosp: {} as d3.ScaleLinear<number, number, never>,
        scaleYDeaths: {} as d3.ScaleLinear<number, number, never>,
        isLoading: true
    }

    public componentDidMount() {
        this.renderTimeline()
    }

    private renderTimeline() {
        if (this.ref.current === null) return;
        let width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        let height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;

        this.setState({
            width: width,
            height: height,
            scaleX: d3.scaleTime()
                .domain(d3.extent(this.props.location.state.data.map(d => new Date(d.date))))
                .range([0, width]),
            scaleYCases: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, d => d.cases)])
                .range([height / 3, 0]),
            scaleYHosp: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, d => d.hosp)])
                .range([height * 2 / 3, height / 3]),
            scaleYDeaths: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, d => d.deaths)])
                .range([height, height * 2 / 3]),           
            isLoading: false
        });
    }

    public render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>World COVID-19 Cases Timeline</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <div ref={this.ref} style={{ width: "100%", height: "40vh" }}>
                        {this.state.isLoading ? <Spinner /> :
                            <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${this.state.width + this.state.margin.left + this.state.margin.right} ${this.state.height + this.state.margin.top + this.state.margin.bottom}`}>
                                <ContentContainer {...{ location: { state: { width: this.state.width, height: this.state.height, translateX: this.state.margin.left, translateY: this.state.margin.top } } } as unknown as ContentContainerProps}>
                                    {this.props.location.state.data.map(d =>
                                        <Circle {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYCases, dataX: new Date(d.date), dataY: d.cases, r: 5, color: "#0000b3" } } } as unknown as CircleProps} />
                                    )}
                                    <Line {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYCases, data: d3.sort(this.props.location.state.data.map(d => { return { x: new Date(d.date), y: d.cases } as LineData }), d => d.x), color: "#0000b3" } } } as unknown as LineProps} />
                                    <Area {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYCases, data: d3.sort(this.props.location.state.data.map(d => { return { x: new Date(d.date), y: d.cases } as AreaData }), d => d.x), color: "#0000b3" } } } as unknown as AreaProps} />
                                    {this.props.location.state.data.map(d =>
                                        <Circle {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYHosp, dataX: new Date(d.date), dataY: d.hosp, r: 5, color: "#b300b3" } } } as unknown as CircleProps} />
                                    )}
                                    <Line {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYHosp, data: d3.sort(this.props.location.state.data.map(d => { return { x: new Date(d.date), y: d.hosp } as LineData }), d => d.x), color: "#b300b3" } } } as unknown as LineProps} />
                                    <Area {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYHosp, data: d3.sort(this.props.location.state.data.map(d => { return { x: new Date(d.date), y: d.hosp } as AreaData }), d => d.x), color: "#b300b3" } } } as unknown as AreaProps} />
                                    {this.props.location.state.data.map(d =>
                                        <Circle {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYDeaths, dataX: new Date(d.date), dataY: d.deaths, r: 5, color: "#b30000" } } } as unknown as CircleProps} />
                                    )}
                                    <Line {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYDeaths, data: d3.sort(this.props.location.state.data.map(d => { return { x: new Date(d.date), y: d.deaths } as LineData }), d => d.x), color: "#b30000" } } } as unknown as LineProps} />
                                    <Area {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleYDeaths, data: d3.sort(this.props.location.state.data.map(d => { return { x: new Date(d.date), y: d.deaths } as AreaData }), d => d.x), color: "#b30000" } } } as unknown as AreaProps} />                                   
                                </ContentContainer>
                                <Axis {...{ location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 4, scale: this.state.scaleYCases } } } as unknown as AxisProps} />
                                <Axis {...{ location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 4, scale: this.state.scaleYHosp } } } as unknown as AxisProps} />
                                <Axis {...{ location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 4, scale: this.state.scaleYDeaths } } } as unknown as AxisProps} />                                
                                <Axis {...{ location: { state: { type: "bottom", translateX: this.state.margin.left, translateY: this.state.height + this.state.margin.top, scale: this.state.scaleX } } } as unknown as AxisProps} />
                            </svg>
                        }
                    </div>
                </CardBody>
            </Card>
        )
    }
}