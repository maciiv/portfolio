import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardBody, CardSubtitle, CardTitle, Spinner } from 'reactstrap';
import { CovidData } from '../../store/Covid';
import * as d3 from 'd3';
import { ChartMargin } from '../../assets/js/CustomMethods';
import ContentContainer, { ContentContainerProps } from '../d3_components/ContentContainer';
import Axis, { AxisProps } from '../d3_components/Axis';
import Line, { LineData, LineProps } from '../d3_components/Line';
import Area, { AreaData, AreaProps } from '../d3_components/Area';
import OverlayContainer, { OverlayContainerProps, OverlayTooltipData } from '../d3_components/OverlayContainer';
import D3Tooltip, { D3TooltipData, D3TooltipProps } from '../d3_components/Tooltip';

export type CovidWorldTimelineProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>;

export default class CovidWorldTimeline extends React.PureComponent<CovidWorldTimelineProps, {
    width: number,
    height: number,
    margin: ChartMargin,
    data: CovidData[],
    scaleX: d3.ScaleTime<number, number, never>,
    scaleYCases: d3.ScaleLinear<number, number, never>,
    scaleYHosp: d3.ScaleLinear<number, number, never>,
    scaleYDeaths: d3.ScaleLinear<number, number, never>,
    isLoading: boolean
}> {
    ref = React.createRef<HTMLDivElement>();
    overlayRef = React.createRef<SVGRectElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 30, bottom: 30, left: 80 } as ChartMargin,
        data: this.props.location.state.data,
        scaleX: {} as d3.ScaleTime<number, number, never>,
        scaleYCases: {} as d3.ScaleLinear<number, number, never>,
        scaleYHosp: {} as d3.ScaleLinear<number, number, never>,
        scaleYDeaths: {} as d3.ScaleLinear<number, number, never>,
        isLoading: true
    }

    public componentDidMount() {
        this.renderTimeline()
    }

    private renderTimeline() {
        if (this.ref.current === null) return;
        let width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        let height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;

        this.setState({
            width: width,
            height: height,
            scaleX: d3.scaleTime()
                .domain(d3.extent(this.state.data.map(d => d.date)))
                .range([0, width]),
            scaleYCases: d3.scaleLinear()
                .domain([0, d3.max(this.state.data, d => d.cases)])
                .range([height / 3, 0]),
            scaleYHosp: d3.scaleLinear()
                .domain([0, d3.max(this.state.data, d => d.hosp)])
                .range([height * 2 / 3, height / 3]),
            scaleYDeaths: d3.scaleLinear()
                .domain([0, d3.max(this.state.data, d => d.deaths)])
                .range([height, height * 2 / 3]),           
            isLoading: false
        });
    }

    private dataByDay() {
        this.updateData(this.props.location.state.data)
    }

    private dataByMonth() {      
        let monthData = d3.rollup(this.props.location.state.data, d => { return { cases: d3.sum(d.map(c => c.cases)), hosp: d3.sum(d.map(c => c.hosp)), deaths: d3.sum(d.map(c => c.deaths)) } }, d => d.month, d => d.year)
        let data = [] as CovidData[];
        Array.from(monthData).forEach(d => {            
            Array.from(d[1]).forEach(c => {
                data.push({
                    date: new Date(`${c[0]}-${d[0]}-1`),
                    cases: c[1].cases,
                    deaths: c[1].deaths,
                    hosp: c[1].hosp
                } as CovidData)
            }) 
        })
        this.updateData(d3.sort(data, d => d.date));
    }

    private dataByYear() {
        let yearData = d3.rollup(this.props.location.state.data, d => { return { cases: d3.sum(d.map(c => c.cases)), hosp: d3.sum(d.map(c => c.hosp)), deaths: d3.sum(d.map(c => c.deaths)) } }, d => d.year)
        this.updateData(Array.from(yearData, ([date, sum]) => ({ date: new Date(date + "-01-01"), cases: sum.cases, hosp: sum.hosp, deaths: sum.deaths }) as CovidData)) 
    }

    private updateData(data: CovidData[]) {
        this.setState({
            data: data,
            scaleX: this.state.scaleX.domain(d3.extent(data.map(d => d.date))),
            scaleYCases: this.state.scaleYCases.domain([0, d3.max(data.map(d => d.cases))]),
            scaleYHosp: this.state.scaleYHosp.domain([0, d3.max(data.map(d => d.hosp))]),
            scaleYDeaths: this.state.scaleYDeaths.domain([0, d3.max(data.map(d => d.deaths))])
        })
    }

    public render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        World COVID-19 Cases Timeline
                    </CardTitle>
                    <CardSubtitle>
                        <ButtonGroup>
                            <Button onClick={() => this.dataByDay()}>
                                Day
                            </Button>
                            <Button onClick={() => this.dataByMonth()}>
                                Month
                            </Button>
                            <Button onClick={() => this.dataByYear()}>
                                Year
                            </Button>
                        </ButtonGroup>
                    </CardSubtitle>
                    <div ref={this.ref} style={{ width: "100%", height: "50vh" }}>
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
                                    } as unknown as ContentContainerProps}
                                >
                                    <Line
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    scaleX: this.state.scaleX,
                                                    scaleY: this.state.scaleYCases,
                                                    data: this.state.data.map(d => { return { x: d.date, y: d.cases } as LineData }),
                                                    color: "#0000b3"
                                                }
                                            }
                                        } as unknown as LineProps}
                                    />
                                    <Area
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    scaleX: this.state.scaleX,
                                                    scaleY: this.state.scaleYCases,
                                                    data: this.state.data.map(d => { return { x: d.date, y: d.cases } as AreaData }),
                                                    color: "#0000b3"
                                                }
                                            }
                                        } as unknown as AreaProps}
                                    />
                                    <Line
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    scaleX: this.state.scaleX,
                                                    scaleY: this.state.scaleYHosp,
                                                    data: this.state.data.map(d => { return { x: d.date, y: d.hosp } as LineData }),
                                                    color: "#b300b3"
                                                }
                                            }
                                        } as unknown as LineProps}
                                    />
                                    <Area
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    scaleX: this.state.scaleX,
                                                    scaleY: this.state.scaleYHosp,
                                                    data: this.state.data.map(d => { return { x: d.date, y: d.hosp } as AreaData }),
                                                    color: "#b300b3"
                                                }
                                            }
                                        } as unknown as AreaProps}
                                    />
                                    <Line
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    scaleX: this.state.scaleX,
                                                    scaleY: this.state.scaleYDeaths,
                                                    data: this.state.data.map(d => { return { x: d.date, y: d.deaths } as LineData }),
                                                    color: "#b30000"
                                                }
                                            }
                                        } as unknown as LineProps}
                                    />
                                    <Area
                                        {...
                                        {
                                            location:
                                            {
                                                state:
                                                {
                                                    scaleX: this.state.scaleX,
                                                    scaleY: this.state.scaleYDeaths,
                                                    data: this.state.data.map(d => { return { x: d.date, y: d.deaths } as AreaData }),
                                                    color: "#b30000"
                                                }
                                            }
                                        } as unknown as AreaProps}
                                    />                                   
                                </ContentContainer>
                                <Axis
                                    {...
                                    {
                                        location:
                                        {
                                            state:
                                            {
                                                type: "left",
                                                translateX: this.state.margin.left,
                                                translateY: this.state.margin.top,
                                                ticks: 4,
                                                scale: this.state.scaleYCases
                                            }
                                        }
                                    } as unknown as AxisProps}
                                />
                                <Axis
                                    {...
                                    {
                                        location:
                                        {
                                            state:
                                            {
                                                type: "left",
                                                translateX: this.state.margin.left,
                                                translateY: this.state.margin.top,
                                                ticks: 4,
                                                scale: this.state.scaleYHosp
                                            }
                                        }
                                    } as unknown as AxisProps}
                                />
                                <Axis
                                    {...
                                    {
                                        location:
                                        {
                                            state:
                                            {
                                                type: "left",
                                                translateX: this.state.margin.left,
                                                translateY: this.state.margin.top,
                                                ticks: 4,
                                                scale: this.state.scaleYDeaths
                                            }
                                        }
                                    } as unknown as AxisProps}
                                />
                                <Axis
                                    {...
                                    {
                                        location:
                                        {
                                            state:
                                            {
                                                type: "bottom",
                                                translateX: this.state.margin.left,
                                                translateY: this.state.margin.top + this.state.height,
                                                scale: this.state.scaleX
                                            }
                                        }
                                    } as unknown as AxisProps}
                                />
                                <OverlayContainer
                                    {...
                                    {
                                        location:
                                        {
                                            state:
                                            {
                                                width: this.state.width,
                                                height: this.state.height,
                                                translateX: this.state.margin.left,
                                                translateY: this.state.margin.top,
                                                scaleX: this.state.scaleX,
                                                scaleY: this.state.scaleYCases,
                                                data: this.state.data.map(d => { return { x: d.date, y: d.cases, name: "Cases", value: d.cases } as OverlayTooltipData })
                                            }
                                        }
                                    } as unknown as OverlayContainerProps}
                                />                                                           
                            </svg>
                        }
                    </div>
                </CardBody>
            </Card>
        )
    }
}