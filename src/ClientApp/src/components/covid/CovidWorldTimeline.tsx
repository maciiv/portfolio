import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle, Spinner } from 'reactstrap';
import { CovidData } from '../../store/Covid';
import * as d3 from 'd3';
import { ChartMargin } from '../../assets/js/CustomMethods';
import ContentContainer, { ContentContainerProps } from '../d3_components/ContentContainer';
import Axis, { AxisProps } from '../d3_components/Axis';
import Circle, { CircleProps } from '../d3_components/Circle';
import Line, { LineProps } from '../d3_components/Line';

export type CovidWorldTimelineProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>;

export default class CovidWorldTimeline extends React.PureComponent<CovidWorldTimelineProps, { width: number, height: number, margin: ChartMargin, scaleX: d3.ScaleTime<number, number, never>, scaleY: d3.ScaleLinear<number, number, never>, isLoading: boolean }> {
    ref = React.createRef<HTMLDivElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 30, bottom: 30, left: 80 } as ChartMargin,
        scaleX: {} as d3.ScaleTime<number, number, never>,
        scaleY: {} as d3.ScaleLinear<number, number, never>,
        isLoading: true
    }

    public componentDidMount() {
        this.renderTimeline()
    }

    private renderTimeline() {
        let width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        let height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;

        this.setState({
            width: width,
            height: height,
            scaleX: d3.scaleTime()
                .domain(d3.extent(this.props.location.state.data.map(d => new Date(d.date))))
                .range([0, width]),
            scaleY: d3.scaleLinear()
                .domain([0, d3.max(this.props.location.state.data, d => d.cases)])
                .range([height, 0]),
            isLoading: false
        });
    }

    public render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>World COVID-19 Timeline</CardTitle>
                    <CardSubtitle></CardSubtitle>
                    <div ref={this.ref} style={{ width: "100%", height: "40vh" }}>
                        {this.state.isLoading ? <Spinner /> :
                            <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${this.state.width + this.state.margin.left + this.state.margin.right} ${this.state.height + this.state.margin.top + this.state.margin.bottom}`}>
                                <ContentContainer {...{ location: { state: { width: this.state.width, height: this.state.height, translateX: this.state.margin.left, translateY: this.state.margin.top } } } as unknown as ContentContainerProps}>
                                    {this.props.location.state.data.map(d =>
                                        <Circle {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleY, dataX: new Date(d.date), dataY: d.cases, r: 5, color: "black" } } } as unknown as CircleProps} />
                                    )}
                                    <Line {...{ location: { state: { scaleX: this.state.scaleX, scaleY: this.state.scaleY, data: this.props.location.state.data, color: "black" } } } as unknown as LineProps} />
                                </ContentContainer>
                                <Axis {...{ location: { state: { type: "left", translateX: this.state.margin.left, translateY: this.state.margin.top, ticks: 10, scale: this.state.scaleY } } } as unknown as AxisProps} />
                                <Axis {...{ location: { state: { type: "bottom", translateX: this.state.margin.left, translateY: this.state.height + this.state.margin.top, ticks: 10, scale: this.state.scaleX } } } as unknown as AxisProps} />
                            </svg>
                        }
                    </div>
                </CardBody>
            </Card>
        )
    }
}