import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type OverlayTooltipData = {
    x: number & (number | Date) & string,
    y: number & (number | Date) & string,
    name: string,
    value: number & (number | Date) & string
}

export type OverlayContainerProps =
    RouteComponentProps<{}, {}, {
        width: number,
        height: number,
        translateX: number,
        translateY: number,
        scaleX: (d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never>) & d3.ScaleBand<string>,
        scaleY: (d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never>) & d3.ScaleBand<string>,
        data: OverlayTooltipData[],
    }>;

export default class OverlayContainer extends React.PureComponent<OverlayContainerProps, { isOn: boolean }> {
    ref = React.createRef<SVGGElement>();
    refC1 = React.createRef<SVGCircleElement>();
    public state = {
        isOn: false
    }

    private getPosition(e: React.MouseEvent<SVGRectElement, MouseEvent>) {
        const scaledPosition = this.scalePosition(e);
        this.renderLine(scaledPosition[0]);
        this.renderCircle(this.refC1.current, scaledPosition[0], scaledPosition[1]);
        this.renderContent(scaledPosition[2])
    }

    private scalePosition(e: React.MouseEvent<SVGRectElement, MouseEvent>): [number, number, OverlayTooltipData] {
        const positionX = this.props.location.state.scaleX.invert(d3.pointer(e)[0]);
        const bisect = d3.bisector((d: any) => d.x).left;
        const i = bisect(this.props.location.state.data, positionX)
        const x = this.props.location.state.scaleX(this.props.location.state.data[i].x);
        const y = this.props.location.state.scaleY(this.props.location.state.data[i].y);
        return [x, y, this.props.location.state.data[i]]
    }

    private renderLine(x: number) {
        d3.select(this.ref.current)
            .select(".tooltip-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", this.props.location.state.height)
            .style("stroke", "black")
    }

    private renderCircle(ref: SVGCircleElement, x: number, y: number) {
        d3.select(ref)
            .attr("cx", x)
            .attr("cy", y)
    }

    private renderContent(data: OverlayTooltipData) {
        d3.select(this.ref.current)
            .select(".content-title")
            .text(d3.timeFormat("%b %d, %Y")(data.x))
        d3.select(this.ref.current)
            .select("#cases .item-value")
            .text(data.value)
    }

    public render() {
        return (
            <g transform={`translate(${this.props.location.state.translateX}, ${this.props.location.state.translateY})`}>
                <g ref={this.ref} opacity={this.state.isOn ? 1 : 0}>
                    <line className="tooltip-line" />
                    <g className="tooltip-content">
                        <rect className="content-background" />
                        <text className="content-title" />
                        <g className="content">
                            <g key="cases">
                                <circle r={5} />
                                <text className="item-name">Cases</text>
                                <text className="item-value" />
                            </g>
                        </g>
                    </g>
                    <circle ref={this.refC1} r={5} />
                </g>
                <rect
                    onMouseMove={(e) => this.getPosition(e)}
                    onMouseEnter={() => this.setState({ isOn: true })}
                    onMouseLeave={() => this.setState({ isOn: false })}
                    width={this.props.location.state.width}
                    height={this.props.location.state.height}
                    opacity={0} />
            </g>
        )
    }
}