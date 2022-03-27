import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as CovidStore from '../../store/Covid';

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
                    <Row className="my-4">
                        {this.props.world.length === 0 ? <Spinner /> :
                            <Col md="12" className="d-flex my-2">
                                <Link to={{ pathname: "/visualisations/covid-dashboard/world", state: { data: this.props.world } }} className="btn btn-secondary btn-block mx-auto w-50">Covid World Dashboard</Link>
                            </Col>
                        }
                        {this.props.countries.length === 0 ? <Spinner /> :
                            <Col md="12" className="d-flex my-2">
                                <Link to={{ pathname: "/visualisations/covid-dashboard/countries", state: { data: this.props.countries } }} className="btn btn-secondary btn-block mx-auto w-50">Covid Countries Dashboard</Link>
                            </Col>
                        } 
                    </Row>
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestCovidWorld();
        this.props.requestCovidCountries();
    }
};

export default connect(
    (state: ApplicationState) => state.covid,
    CovidStore.actionCreators
)(CovidDashboard as any);