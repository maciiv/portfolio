import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type LineData = {
    x: number & (number | Date) & string,
    y: number & (number | Date) & string
}

export type LineProps =
    RouteComponentProps<{}, {}, {
        scaleX: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string> ,
        scaleY: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>,
        data: LineData[]
        color: string
    }>;

export default class Line extends React.PureComponent<LineProps, { d: string }> {
    ref = React.createRef<SVGPathElement>();
    public state = {
        d: d3.line<LineData>()
            .x(d => this.props.location.state.scaleX(d.x) as number)
            .y(d => this.props.location.state.scaleY(d.y) as number)
            (this.props.location.state.data)
    }

    public componentDidMount() {
        this.renderLine();
    }

    public componentDidUpdate() {
        this.pathGenerator();
        this.renderLine();
    }

    private pathGenerator() {
        this.setState({
            d: d3.line<LineData>()
                .x(d => this.props.location.state.scaleX(d.x) as number)
                .y(d => this.props.location.state.scaleY(d.y) as number)
                (this.props.location.state.data)
        })
    }

    public renderLine() {
        let totalLenght = this.ref.current.getTotalLength();

        d3.select(this.ref.current)
            .classed("line", true)
            .attr("stroke-dasharray", `${totalLenght}, ${totalLenght}`)
            .attr("stroke-dashoffset", totalLenght)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    }

    public render() {
        return (
            <path ref={this.ref}
                d={this.state.d}
                fill="none"
                stroke={this.props.location.state.color}
            />
        )
    }
}