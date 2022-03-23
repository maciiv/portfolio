import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type D3TooltipData = {
    x: number & (number | Date) & string,
    y: number & (number | Date) & string,
    name: string,
    value: number & (number | Date) & string
}

export type D3TooltipProps =
    RouteComponentProps<{}, {}, {
        scaleX: (d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never>) & d3.ScaleBand<string>,
        sclaeY: (d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never>) & d3.ScaleBand<string>,
        data: D3TooltipData[],
        position: [number, number]
    }>;

export default class D3Tooltip extends React.PureComponent<D3TooltipProps> {
    ref = React.createRef<SVGGElement>()

    public componentDidMount() {
        this.renderTooltip();
    }

    public componentDidUpdate() {
        this.renderTooltip();
    }

    private renderLine(x: number) {
        d3.select(this.ref.current)
            .select(".tooltip-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", 500)
            .style("stroke", "black")
    }

    private renderTooltip() {
        const xInverted = this.props.location.state.scaleX.invert(this.props.location.state.position[0]);
        const bisect = d3.bisector((d: any) => d.date).left;
        const baseX = 0;
        this.renderLine(this.props.location.state.scaleX(xInverted))
    }

    public render() {
        return (
            <g ref={this.ref}>
                <line className="tooltip-line" />
                <g className="tooltip-content">
                    <rect className="content-background" />
                    <text className="content-title" />
                    <g className="content">
                    </g>
                </g>
            </g>
        )
    }
}