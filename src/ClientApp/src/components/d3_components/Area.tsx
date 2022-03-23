import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type AreaData = {
    x: number & (number | Date) & string,
    y: number & (number | Date) & string
}

export type AreaProps =
    RouteComponentProps<{}, {}, {
        scaleX: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>,
        scaleY: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>,
        data: AreaData[]
        color: string
    }>;

export default class Area extends React.PureComponent<AreaProps, { area: string }> {
    ref = React.createRef<SVGPathElement>();
    public state = {
        area: d3.area<AreaData>()
            .x(d => this.props.location.state.scaleX(d.x) as number)
            .y1(d => this.props.location.state.scaleY(d.y) as number)
            .y0(d => this.props.location.state.scaleY(0 as number & (number | Date) & string) as number)
            (this.props.location.state.data)
    }

    public componentDidMount() {
        this.renderArea();
    }

    public componentDidUpdate() {
        this.areaGenerator();
        this.renderArea();
    }

    public renderArea() {
        d3.select(this.ref.current)
            .classed("area", true)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr("opacity", 0.25);
    }

    private areaGenerator() {
        this.setState({
            area: d3.area<AreaData>()
                .x(d => this.props.location.state.scaleX(d.x) as number)
                .y1(d => this.props.location.state.scaleY(d.y) as number)
                .y0(d => this.props.location.state.scaleY(0 as number & (number | Date) & string) as number)
                (this.props.location.state.data)
        })
    }

    public render() {
        return (
            <path ref={this.ref}
                d={this.state.area}
                fill={this.props.location.state.color}
                opacity={0}
            />
        )
    }
}