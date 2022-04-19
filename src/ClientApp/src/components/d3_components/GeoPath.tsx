import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as d3 from 'd3';

export type GeoPathProps =
    RouteComponentProps<{}, {}, {
        width: number,
        height: number,
        data: d3.ExtendedFeature,
        color: string,
        hover: Function
    }>;

export default class GeoPath extends React.PureComponent<GeoPathProps, { projection: d3.GeoProjection }> {
    ref = React.createRef<SVGPathElement>();
    public state = {
        projection: d3.geoMercator()
            .scale(135)
            .center([0, 45])
            .translate([this.props.location.state.width / 2, this.props.location.state.height / 2])
    }

    public componentDidMount() {
        this.renderMap();
    }

    public componentDidUpdate() {
        this.renderMap();
    }

    public renderMap() {
        d3.select<SVGPathElement, d3.ExtendedFeature>(this.ref.current)
            .classed("geo-path", true)
            .datum(this.props.location.state.data)
            .attr("id", d => d.properties["name"])
            .transition()
            .duration(750)
            .attr("d", d3.geoPath().projection(this.state.projection))
            .ease(d3.easeLinear)
    }

    public render() {
        return (
            <path ref={this.ref}
                clipPath="url(#clip)"
                fill={this.props.location.state.color}
                stroke="black"
                onMouseEnter={(e) => this.props.location.state.hover(e, this.props.location.state.data.properties["name"])}
                onMouseLeave={(e) => this.props.location.state.hover(e, undefined)}
            />
        )
    }
}