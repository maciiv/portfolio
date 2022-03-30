import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChartMargin } from '../../assets/js/CustomMethods';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import * as d3 from 'd3';
import { CovidData } from '../../store/Covid';
import ContentContainer, { ContentContainerProps } from '../d3_components/ContentContainer';
import GeoPath, { GeoPathProps } from '../d3_components/GeoPath';

export type CovidCountriesMapProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>

export default class CovidCountriesMap extends React.PureComponent<CovidCountriesMapProps, {
    width: number,
    height: number,
    margin: ChartMargin,
    data: CovidData[],
    geoData: d3.ExtendedFeatureCollection,
    isLoading: boolean
}> {
    ref = React.createRef<HTMLDivElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 80, bottom: 30, left: 30 } as ChartMargin,
        data: this.props.location.state.data,
        geoData: {} as d3.ExtendedFeatureCollection,
        isLoading: true
    }

    public componentDidMount() {
        this.renderMap()
    }

    private renderMap() {
        if (this.ref.current === null) return;
        const width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        const height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;

        fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
            .then(response => response.json() as Promise<d3.ExtendedFeatureCollection>)
            .then(data => {
                this.setState({
                    width: width,
                    height: height,
                    geoData: data,
                    isLoading: false
                })
            })
    }

    private colorScale() {
        const test = d3.scaleLinear()
            .domain([0, d3.max(this.state.data.map(d => d.cases))])
    }

    public render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <CardTitle>
                            <h5>COVID-19 World Map</h5>
                        </CardTitle>
                        <CardSubtitle>
                        </CardSubtitle>
                        <div ref={this.ref} style={{ width: "100%", height: "70vh" }}>
                            {this.state.isLoading ? <Spinner /> :
                                <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${this.state.width + this.state.margin.left + this.state.margin.right} ${this.state.height + this.state.margin.top + this.state.margin.bottom}`}>
                                    <ContentContainer
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    width: this.state.width,
                                                    height: this.state.height,
                                                    translateX: this.state.margin.left,
                                                    translateY: this.state.margin.top
                                                }
                                            }
                                        } as unknown as ContentContainerProps}>
                                        {this.state.geoData.features.map(d =>
                                            <GeoPath {...
                                                {
                                                    location: {
                                                        state: {
                                                            width: this.state.width,
                                                            height: this.state.height,
                                                            data: d,
                                                            color: "black"
                                                        }
                                                    }
                                                } as unknown as GeoPathProps} />
                                            )}
                                    </ContentContainer>
                                </svg>
                            }
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}