import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import * as d3 from 'd3';
import CovidWorldTimeline, { CovidWorldTimelineProps } from './CovidWorldTimeline';
import { CovidData } from '../../store/Covid';

export type CovidWorldProps =
    RouteComponentProps<{}, {}, { data: CovidData[]}>

export default class CovidWorld extends React.PureComponent<CovidWorldProps, { totalCases: number, totalHosp: number, totalDeaths: number, totalVax: number, isLoading: boolean }> {
    public state = {
        totalCases: 0,
        totalHosp: 0,
        totalDeaths: 0,
        totalVax: 0,
        isLoading: true
    }

    public componentDidMount() {
        if (this.props.location.state !== undefined) {
            this.setState({
                totalCases: Math.round(d3.sum(this.props.location.state.data.map(c => c.cases))),
                totalHosp: Math.round(d3.sum(this.props.location.state.data.map(c => c.hosp))),
                totalDeaths: Math.round(d3.sum(this.props.location.state.data.map(c => c.deaths))),
                totalVax: Math.round(d3.sum(this.props.location.state.data.map(c => c.vax))),
                isLoading: false
            })
        }
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <Spinner /> :
                    <Row className="m-4">
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><h5 className="mx-auto font-weight-bold">{this.state.totalCases}</h5></CardTitle>
                                    <CardSubtitle className="text-muted d-flex"><span className="mx-auto">Total Cases</span></CardSubtitle>
                                    <CardSubtitle className="text-muted d-flex"><small className="mx-auto">(per million)</small></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><h5 className="mx-auto font-weight-bold">{this.state.totalHosp}</h5></CardTitle>
                                    <CardSubtitle className="text-muted d-flex"><span className="mx-auto">Total Hospitalisations</span></CardSubtitle>
                                    <CardSubtitle className="text-muted d-flex"><small className="mx-auto">(per million)</small></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><h5 className="mx-auto font-weight-bold">{this.state.totalDeaths}</h5></CardTitle>
                                    <CardSubtitle className="text-muted d-flex"><span className="mx-auto">Total Deaths</span></CardSubtitle>
                                    <CardSubtitle className="text-muted d-flex"><small className="mx-auto">(per million)</small></CardSubtitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="3">
                            <Card>
                                <CardBody>
                                    <CardTitle className="d-flex"><h5 className="mx-auto font-weight-bold">{this.state.totalVax}</h5></CardTitle>
                                    <CardSubtitle className="text-muted d-flex"><span className="mx-auto">Total fully vax</span></CardSubtitle>
                                    <CardSubtitle className="text-muted d-flex"><small className="mx-auto">(per hundred)</small></CardSubtitle>
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