import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type TooltipValues = {
    name: string,
    value: number | string | undefined
}

export type TooltipProps =
    RouteComponentProps<{}, {}, {
        translateX: number,
        translateY: number,
        title: string | undefined,
        values: TooltipValues[]
    }>;

export default class Tooltip extends React.PureComponent<TooltipProps> {

    public render() {
        return (
                <g className="tooltip-content" opacity={this.props.location.state.title === undefined ? 0 : 1} transform={`translate(${this.props.location.state.translateX}, ${this.props.location.state.translateY})`}>
                    <rect className="content-background" y={-20} x={-5} width={200} height={90} />
                    <text className="content-title">{this.props.location.state.title}</text>
                    <g className="content">
                        {this.props.location.state.values.map(v => 
                            <g>
                                <text className="item-name" x={15}>{v.name}</text>
                                <text className="item-value" x={65}>{v.value}</text>
                            </g>
                            )}
                    </g>
                </g>
            )
    }
}