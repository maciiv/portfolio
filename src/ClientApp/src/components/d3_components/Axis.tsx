import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type AxisProps =
    RouteComponentProps<{}, {}, {
        type: string,
        translateX: number,
        translateY: number,
        ticks: number,
        scale: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never> | d3.ScaleBand<string>
    }>;

export default class Axis extends React.PureComponent<AxisProps, { axis: d3.Axis<d3.AxisDomain> }> {
    ref = React.createRef<SVGGElement>();
    public state = {
        axis: this.props.location.state.type == "left" ?
            d3.axisLeft<d3.NumberValue | Date | string>(this.props.location.state.scale).ticks(this.props.location.state.ticks) :
            d3.axisBottom<d3.NumberValue | Date | string>(this.props.location.state.scale).ticks(this.props.location.state.ticks)
    }


    public componentDidMount() {
        this.renderAxis()
    }

    private renderAxis() {
        d3.select(this.ref.current)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .call(this.state.axis);
    }

    public render() {
        return (
            <g ref={this.ref} transform={`translate(${this.props.location.state.translateX}, ${this.props.location.state.translateY})`} />
            )
    }
}