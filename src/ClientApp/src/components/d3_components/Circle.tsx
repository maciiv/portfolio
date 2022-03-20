import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type CircleProps =
    RouteComponentProps<{}, {}, {
        scaleX: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>,
        scaleY: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>,
        dataX: number & (number | Date) & string,
        dataY: number & (number | Date) & string,
        r: number,
        color: string
    }>;

export default class Circle extends React.PureComponent<CircleProps> {
    ref = React.createRef<SVGCircleElement>();

    public componentDidMount() {
        this.renderCircle();
    }

    public renderCircle() {
        d3.select(this.ref.current)
            .classed("circle", true)
            .transition()
            .duration(750)
            .attr("cx", this.props.location.state.scaleX(this.props.location.state.dataX))
            .attr("cy", this.props.location.state.scaleY(this.props.location.state.dataY));
    }

    public render() {
        return (
            <circle ref={this.ref}
                cx={0}
                cy={0}
                r={this.props.location.state.r}
                fill={this.props.location.state.color}
                stroke={this.props.location.state.color}
                style={{ "fillOpacity": 0.5 }}
            />
        )
    }
}