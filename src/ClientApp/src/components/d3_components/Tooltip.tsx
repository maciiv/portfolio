import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { PositionTooltip } from '../../assets/js/CustomMethods'

export type TooltipInteraction = {
    x: number,
    y: number,
    width: number,
    height: number,
    title: string | undefined,
    tooltipValues: TooltipValues[]
}

export type TooltipValues = {
    name: string,
    value: number | string | undefined
}

export type TooltipProps =
    RouteComponentProps<{}, {}, TooltipInteraction>;

export default class Tooltip extends React.PureComponent<TooltipProps, { position: PositionTooltip }> {
    refTooltip = React.createRef<SVGGElement>()

    public state = {
        position: new PositionTooltip()
    }

    public render() {
        return (
            <g ref={this.refTooltip} className="tooltip-content" opacity={this.props.location.state.title === undefined ? 0 : 1}
                transform={`translate(${this.state.position.translateX(this.props.location.state.x, this.props.location.state.width, this.refTooltip) + 10}, ${this.state.position.translateY(this.props.location.state.y, this.props.location.state.height, this.refTooltip)})`}>
                    <rect className="content-background" y={-20} x={-5} width={200} height={90} />
                    <text className="content-title">{this.props.location.state.title}</text>
                    <g className="content">
                        {this.props.location.state.tooltipValues !== undefined ? this.props.location.state.tooltipValues.map((v, i) => 
                            <g transform={`translate(0, ${(i + 1) * 15})`}>
                                <text className="item-name" x={15}>{v.name}</text>
                                <text className="item-value" x={65}>{v.value}</text>
                            </g>
                            ) : null}
                    </g>
                </g>
            )
    }
}