import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as CovidStore from '../../store/Covid';
import * as d3 from 'd3';
import CovidWidget, { CovidWidgetProps } from './CovidWidget';
import CovidWorldTimeline, { CovidWorldTimelineProps } from './CovidWorldTimeline';

type CovidDashboardProps =
    CovidStore.CovidState
    & typeof CovidStore.actionCreators;

class CovidDashboard extends React.PureComponent<CovidDashboardProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    {this.props.world.length === 0 ? <Spinner /> :
                        <Row className="my-4">
                            <Col md="9"><CovidWorldTimeline  {...{ location: { state: { data: this.props.world } } } as unknown as CovidWorldTimelineProps} /></Col>
                            <Col md="3">
                                <CovidWidget {...{ location: { state: { name: "Total Cases", number: Math.round(d3.sum(this.props.world.map(c => c.cases))) } } } as unknown as CovidWidgetProps} />
                                <CovidWidget {...{ location: { state: { name: "Total Hospitalisations", number: Math.round(d3.sum(this.props.world.map(c => c.hosp))) } } } as unknown as CovidWidgetProps} />
                                <CovidWidget {...{ location: { state: { name: "Total Deaths", number: Math.round(d3.sum(this.props.world.map(c => c.deaths))) } } } as unknown as CovidWidgetProps} />                               
                            </Col>
                        </Row>
                    }
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestCovidWorld();
    }
};

export default connect(
    (state: ApplicationState) => state.covid,
    CovidStore.actionCreators
)(CovidDashboard as any);