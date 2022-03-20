import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type LineProps =
    RouteComponentProps<{}, {}, {
        scaleX: d3.ScaleTime<number, number, never> ,
        scaleY: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>,
        data: []
        color: string
    }>;

export default class Line extends React.PureComponent<LineProps> {
    ref = React.createRef<SVGPathElement>();

    public componentDidMount() {
        this.renderLine();
    }

    public renderLine() {
        let d = d3.line()
            .x((d:any) => this.props.location.state.scaleX(new Date(d.date)))
            .y((d: any) => this.props.location.state.scaleY(d.cases))
            (d3.sort(this.props.location.state.data, (d:any) => new Date(d.date)))

        d3.select(this.ref.current)
            .classed("line", true)
            .transition()
            .duration(750)
            .attr("d", d);
    }

    public render() {
        return (
            <path ref={this.ref}
                d=""
                fill="none"
                stroke={this.props.location.state.color}
            />
        )
    }
}