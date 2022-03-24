import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import * as d3 from 'd3';
import CovidWorldTimeline, { CovidWorldTimelineProps } from './CovidWorldTimeline';
import { CovidData } from '../../store/Covid';

export type CovidWorldProps =
    RouteComponentProps<{}, {}, { data: CovidData[]}>

export default class CovidWorld extends React.PureComponent<CovidWorldProps, { totalCases: number, totalHosp: number, totalDeaths: number, isLoading: boolean }> {
    public state = {
        totalCases: Math.round(d3.sum(this.props.location.state.data.map(c => c.cases))),
        totalHosp: Math.round(d3.sum(this.props.location.state.data.map(c => c.hosp))),
        totalDeaths: Math.round(d3.sum(this.props.location.state.data.map(c => c.deaths))),
        isLoading: true
    }

    public componentDidMount() {
        this.setState({
            isLoading: false
        })
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <Spinner /> :
                    <Row className="my-4">
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><span className="mx-auto">{this.state.totalCases}</span></CardTitle>
                                    <CardSubtitle className="mb-2 text-muted d-flex"><span className="mx-auto">Total Cases</span></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><span className="mx-auto">{this.state.totalHosp}</span></CardTitle>
                                    <CardSubtitle className="mb-2 text-muted d-flex"><span className="mx-auto">Total Hospitalisations</span></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><span className="mx-auto">{this.state.totalDeaths}</span></CardTitle>
                                    <CardSubtitle className="mb-2 text-muted d-flex"><span className="mx-auto">Total Deaths</span></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><span className="mx-auto">{Math.round(this.state.totalDeaths / this.state.totalCases * 10000) / 100}%</span></CardTitle>
                                    <CardSubtitle className="mb-2 text-muted d-flex"><span className="mx-auto">Mortality Rate</span></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="12" className="mt-3"><CovidWorldTimeline  {...{ location: { state: { data: this.props.location.state.data } } } as unknown as CovidWorldTimelineProps} /></Col>
                    </Row>
                }
            </React.Fragment>
        );
    }
};