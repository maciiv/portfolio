import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type AxisProps =
    RouteComponentProps<{}, {}, { type: string, translateX: number, translateY: number, scale: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string> }>;

export default class Axis extends React.PureComponent<AxisProps> {
    ref = React.createRef<SVGGElement>();

    public componentDidMount() {
        this.renderAxis()
    }

    private renderAxis() {
        const axis = this.props.location.state.type == "left" ?
            d3.axisLeft<d3.NumberValue | Date | string>(this.props.location.state.scale) :
            d3.axisBottom<d3.NumberValue | Date | string>(this.props.location.state.scale);
        const axisG = d3.select(this.ref.current);
        axisG.transition()
            .duration(750)
            .ease(d3.easeLinear)
            .call(axis);
    }

    public render() {
        return (
            <g ref={this.ref} transform={`translate(${this.props.location.state.translateX}, ${this.props.location.state.translateY})`} />
            )
    }
}