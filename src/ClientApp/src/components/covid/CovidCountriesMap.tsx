import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChartMargin } from '../../assets/js/CustomMethods';
import { Button, ButtonGroup, Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import * as d3 from 'd3';
import { CovidData } from '../../store/Covid';
import ContentContainer, { ContentContainerProps } from '../d3_components/ContentContainer';
import GeoPath, { GeoPathProps } from '../d3_components/GeoPath';
import CovidCountriesMapLegend, { CovidCountriesMapLegendProps } from './CovidCountriesMapLegend';
import { ExtendedFeature } from 'd3';
import Tooltip, { TooltipInteraction, TooltipProps, TooltipValues } from '../d3_components/Tooltip';

type FilterData = {
    country: string,
    data: number
}

export type CovidCountriesMapProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>

export default class CovidCountriesMap extends React.PureComponent<CovidCountriesMapProps, {
    width: number,
    height: number,
    margin: ChartMargin,
    data: CovidData[],
    geoData: d3.ExtendedFeatureCollection,
    filterData: FilterData[],
    colorScale: d3.ScaleLinear<number, number, never>,
    color: Function,
    tooltipInteraction: TooltipInteraction,
    isLoading: boolean
}> {
    ref = React.createRef<HTMLDivElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 150, bottom: 30, left: 30 } as ChartMargin,
        data: this.props.location.state.data,
        geoData: {} as d3.ExtendedFeatureCollection<ExtendedFeature<d3.GeoGeometryObjects>>,
        filterData: [] as FilterData[],
        colorScale: {} as d3.ScaleLinear<number, number, never>,
        color: d3.interpolateBlues,
        tooltipInteraction: {} as TooltipInteraction,
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
            .then(geoData => {
                const countriesData = d3.rollup(this.props.location.state.data,
                    d => {
                        return {
                            cases: d3.sum(d.map(c => c.cases)),
                            hosp: d3.sum(d.map(c => c.hosp)),
                            deaths: d3.sum(d.map(c => c.deaths)),
                            vax: d3.sum(d.map(c => c.vax))
                        }
                    }, d => d.country);
                const data = Array.from(countriesData, ([country, sum]) => ({ country: country, cases: sum.cases, hosp: sum.hosp, deaths: sum.deaths, vax: sum.vax }) as CovidData)
                this.setState({
                    width: width,
                    height: height,
                    geoData: geoData,
                    data: data,
                    filterData: data.map(d => { return { country: d.country, data: d.cases } as FilterData }),
                    colorScale: d3.scaleLinear()
                        .domain([0, d3.max(data.map(d => d.cases))])
                        .range([0, 1]),
                    isLoading: false
                })
            })
    }

    private filterBy(country: string): number {
        const fd = this.state.filterData.find(d => d.country == country)
        if (fd !== undefined) {
            return fd.data
        } else {
            return 0
        }
    }

    private dataByCases() {
        this.setState({
            filterData: this.state.data.map(d => { return { country: d.country, data: d.cases } as FilterData }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(d => d.cases))]),
            color: d3.interpolateBlues
        })
    }

    private dataByHosp() {
        this.setState({
            filterData: this.state.data.map(d => { return { country: d.country, data: d.hosp } as FilterData }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(d => d.hosp))]),
            color: d3.interpolatePurples
        })
    }
    private dataByDeaths() {
        this.setState({
            filterData: this.state.data.map(d => { return { country: d.country, data: d.deaths } as FilterData }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(d => d.deaths))]),
            color: d3.interpolateReds
        })
    }

    private dataByVax() {
        this.setState({
            filterData: this.state.data.map(d => { return { country: d.country, data: d.vax } as FilterData }),
            colorScale: this.state.colorScale.domain([0, d3.max(this.state.data.map(d => d.vax))]),
            color: d3.interpolateGreens
        })
    }

    private geoMapHover(e: React.MouseEvent<SVGPathElement, MouseEvent>, country: string) {
        let find = this.state.filterData.find(d => d.country == country);
        let value = 0
        if (find !== undefined) {
            value = find.data
        }
        this.setState({
            tooltipInteraction: {
                x: d3.pointer(e)[0],
                y: d3.pointer(e)[1],
                width: this.state.width,
                height: this.state.height,
                title: country,
                tooltipValues: [{
                    name: "Value",
                    value: Math.round(value)
                }]
            }
        })
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
                            <ButtonGroup>
                                <Button onClick={() => this.dataByCases()}>
                                    Cases
                                </Button>
                                <Button onClick={() => this.dataByHosp()}>
                                    Hospitalisations
                                </Button>
                                <Button onClick={() => this.dataByDeaths()}>
                                    Deaths
                                </Button>
                                <Button onClick={() => this.dataByVax()}>
                                    Vaccinations
                                </Button>
                            </ButtonGroup>
                        </CardSubtitle>
                        <div ref={this.ref} style={{ width: "100%", height: "80vh" }}>
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
                                                            color: this.state.color(this.state.colorScale(this.filterBy(d.properties["name"]))),
                                                            hover: this.geoMapHover.bind(this)
                                                        }
                                                    }
                                                } as unknown as GeoPathProps} />
                                        )}
                                        <Tooltip {...
                                            {
                                                location: {
                                                    state: {
                                                        x: this.state.tooltipInteraction.x,
                                                        y: this.state.tooltipInteraction.y,
                                                        width: this.state.tooltipInteraction.width,
                                                        height: this.state.tooltipInteraction.height,
                                                        title: this.state.tooltipInteraction.title,
                                                        tooltipValues: this.state.tooltipInteraction.tooltipValues
                                                    }
                                                }
                                            } as unknown as TooltipProps} />
                                    </ContentContainer>
                                    <CovidCountriesMapLegend {...
                                        {
                                            location: {
                                                state: {
                                                    height: this.state.height,
                                                    translateX: this.state.width + this.state.margin.right,
                                                    color: this.state.color,
                                                    max: d3.max(this.state.filterData.map(d => d.data))
                                                }
                                            }
                                        } as unknown as CovidCountriesMapLegendProps} />
                                </svg>
                            }
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}