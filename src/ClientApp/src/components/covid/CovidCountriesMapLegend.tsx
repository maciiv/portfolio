import * as React from 'react';
import * as d3 from 'd3';
import { RouteComponentProps } from 'react-router-dom';
import Axis, { AxisProps } from '../d3_components/Axis';

type colorRange = {
    color: string,
    value: number
}

export type CovidCountriesMapLegendProps =
    RouteComponentProps<{}, {}, {
        height: number,
        translateX: number,
        color: Function,
        max: number
    }>;

export default class CovidCountriesMapLegend extends React.PureComponent<CovidCountriesMapLegendProps, { range: colorRange[], scale: d3.ScaleLinear<number, number, never> }> {
    public state = {
        range: d3.range(10).map(d => { return { color: this.props.location.state.color(d / 10), value: d } }),
        scale: d3.scaleLinear()
            .domain([0, this.props.location.state.max])
            .range([this.props.location.state.height, 0])
    }

    public componentDidMount() {
        this.renderLegend()
    }

    public componentDidUpdate(prevProps: CovidCountriesMapLegendProps) {
        if (prevProps.location.state.color !== this.props.location.state.color) {
            this.setState({
                range: d3.range(10).map(d => { return { color: this.props.location.state.color(d / 10), value: d } }),
                scale: this.state.scale.domain([0, this.props.location.state.max])
            })
        }
        this.renderLegend()
    }

    private renderLegend() {
        d3.select("#legendGradient")
            .selectAll("stop")
            .data(this.state.range)
            .join(
                enter => enter.append("stop")
                    .attr("offset", d => (d.value / 10 * 100) + "%")
                    .attr("stop-color", d => d.color),
                update => update.attr("offset", d => (d.value / 10 * 100) + "%")
                    .attr("stop-color", d => d.color),
                exit => exit
            )
    }

    public render() {
        return (
            <g transform={`translate(${this.props.location.state.translateX}, 0)`}>
                <g>
                    <rect width="20" height={this.props.location.state.height} style={{ "fill": 'url("#legendGradient")' }} />
                </g>
                <Axis
                    {...
                    {
                        location:
                        {
                            state:
                            {
                                type: "left",
                                translateX: 0,
                                translateY: 0,
                                ticks: 10,
                                scale: this.state.scale
                            }
                        }
                    } as unknown as AxisProps}
                />
                <defs>
                    <linearGradient id="legendGradient" x1="0%" y1="100%" x2="0%" y2="0%"></linearGradient>
                </defs>
            </g>
            )
    }
}