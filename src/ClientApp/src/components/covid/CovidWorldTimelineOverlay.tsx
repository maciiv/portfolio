import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';
import { CovidData } from '../../store/Covid';
import { PositionTooltip } from '../../assets/js/CustomMethods'

export type CovidWorldTimelineOverlayProps =
    RouteComponentProps<{}, {}, {
        width: number,
        height: number,
        translateX: number,
        translateY: number,
        scaleX: d3.ScaleTime<number, number, never>,
        scaleYCases: d3.ScaleLinear<number, number, never>,
        scaleYHosp: d3.ScaleLinear<number, number, never>,
        scaleYDeaths: d3.ScaleLinear<number, number, never>,
        scaleYVax: d3.ScaleLinear<number, number, never>,
        data: CovidData[],
    }>;

type scaledPosition = {
    x: number,
    yCases: number,
    yHosp: number,
    yDeaths: number,
    yVax: number,
    data: CovidData
}

export default class CovidWorldTimelineOverlay extends React.PureComponent<CovidWorldTimelineOverlayProps, { isOn: boolean, position: PositionTooltip }> {
    refTooltipContent = React.createRef<SVGGElement>();
    refCircleCases = React.createRef<SVGCircleElement>();
    refCircleHosp = React.createRef<SVGCircleElement>();
    refCircleDeaths = React.createRef<SVGCircleElement>();
    refCircleVax = React.createRef<SVGCircleElement>();
    refContentCases = React.createRef<SVGGElement>();
    refContentHosp = React.createRef<SVGGElement>();
    refContentDeaths = React.createRef<SVGGElement>();
    refContentVax = React.createRef<SVGGElement>();
    public state = {
        isOn: false,
        position: new PositionTooltip()
    }

    private getPosition(e: React.MouseEvent<SVGRectElement, MouseEvent>) {
        const scaledPosition = this.scalePosition(e);
        this.renderLine(scaledPosition.x);
        this.renderCircle(this.refCircleCases.current, scaledPosition.x, scaledPosition.yCases);
        this.renderCircle(this.refCircleHosp.current, scaledPosition.x, scaledPosition.yHosp);
        this.renderCircle(this.refCircleDeaths.current, scaledPosition.x, scaledPosition.yDeaths);
        this.renderCircle(this.refCircleVax.current, scaledPosition.x, scaledPosition.yVax);
        this.renderContent(scaledPosition.x, scaledPosition.data);
    }

    private scalePosition(e: React.MouseEvent<SVGRectElement, MouseEvent>): scaledPosition {
        const positionX = this.props.location.state.scaleX.invert(d3.pointer(e)[0]);
        const bisect = d3.bisector((d: CovidData) => d.date).left;
        const i = bisect(this.props.location.state.data, positionX)
        const x = this.props.location.state.scaleX(this.props.location.state.data[i].date);
        const yCases = this.props.location.state.scaleYCases(this.props.location.state.data[i].cases);
        const yHosp = this.props.location.state.scaleYHosp(this.props.location.state.data[i].hosp);
        const yDeaths = this.props.location.state.scaleYDeaths(this.props.location.state.data[i].deaths);
        const yVax = this.props.location.state.scaleYVax(this.props.location.state.data[i].vax);
        return {
            x: x,
            yCases: yCases,
            yHosp: yHosp,
            yDeaths: yDeaths,
            yVax: yVax,
            data: this.props.location.state.data[i]
        }
    }

    private renderLine(x: number) {
        d3.select(".tooltip-line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", this.props.location.state.height)
            .style("stroke", "black")
    }

    private renderCircle(ref: SVGCircleElement | null, x: number, y: number) {
        d3.select(ref)
            .attr("cx", x)
            .attr("cy", y)
    }

    private renderContent(x: number, data: CovidData) {
        d3.select(".content-title")
            .text(d3.timeFormat("%b %d, %Y")(data.date))
        d3.select(".content")
            .attr("transform", "translate(10, 15)")
        d3.select(this.refContentCases.current)
            .select(".item-value")
            .text(Math.round(data.cases))
        d3.select(this.refContentHosp.current)
            .select(".item-value")
            .text(`${Math.round(data.hosp)} (${data.cases === 0 ? 0 : Math.round(data.hosp / data.cases * 10000) / 100}%)`)
        d3.select(this.refContentDeaths.current)
            .select(".item-value")
            .text(`${Math.round(data.deaths)} (${data.cases === 0 ? 0 : Math.round(data.deaths / data.cases * 10000) / 100}%)`)
        d3.select(this.refContentVax.current)
            .select(".item-value")
            .text(`${Math.round(data.vax)}`)      
        d3.select(".tooltip-content")
            .attr("transform", `translate(${this.state.position.translateX(x + 10, this.props.location.state.width, this.refTooltipContent)}, 30)`)
    }

    public render() {
        return (
            <g transform={`translate(${this.props.location.state.translateX}, ${this.props.location.state.translateY})`}>
                <g opacity={this.state.isOn ? 1 : 0}>
                    <line className="tooltip-line" />
                    <g ref={this.refTooltipContent} className="tooltip-content">
                        <rect className="content-background" y={-20} x={-5} width={200} height={90} />
                        <text className="content-title" />
                        <g className="content">
                            <g ref={this.refContentCases}>
                                <circle r={5} fill="#0000b3" stroke="#0000b3" />
                                <text className="item-name" x={15}>Cases: </text>
                                <text className="item-value" x={65} />
                            </g>
                            <g ref={this.refContentHosp} transform={"translate(0, 15)"}>
                                <circle r={5} fill="#b300b3" stroke="#b300b3" />
                                <text className="item-name" x={15}>Hosp: </text>
                                <text className="item-value" x={65} />
                            </g>
                            <g ref={this.refContentDeaths} transform={"translate(0, 30)"}>
                                <circle r={5} fill="#b30000" stroke="#b30000" />
                                <text className="item-name" x={15}>Deaths: </text>
                                <text className="item-value" x={65} />
                            </g>
                            <g ref={this.refContentVax} transform={"translate(0, 45)"}>
                                <circle r={5} fill="#009933" stroke="#009933" />
                                <text className="item-name" x={15}>Vax: </text>
                                <text className="item-value" x={65} />
                            </g>
                        </g>
                    </g>
                    <circle ref={this.refCircleCases} r={5} fill="#0000b3" stroke="#0000b3" />
                    <circle ref={this.refCircleHosp} r={5} fill="#b300b3" stroke="#b300b3" />
                    <circle ref={this.refCircleDeaths} r={5} fill="#b30000" stroke="#b30000" />
                    <circle ref={this.refCircleVax} r={5} fill="#009933" stroke="#009933" />
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