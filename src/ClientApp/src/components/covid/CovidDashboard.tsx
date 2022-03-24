import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as CovidStore from '../../store/Covid';
import CovidWorld, { CovidWorldProps } from './CovidWorld';

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
                        <CovidWorld {...{ location: { state: { data: this.props.world } } } as unknown as CovidWorldProps} />
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