import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { CovidData } from '../../store/Covid';
import CovidCountriesMap, { CovidCountriesMapProps } from './CovidCountriesMap';

export type CovidCountriesProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>

export default class CovidCountries extends React.PureComponent<CovidCountriesProps, { isLoading: boolean }> {
    public state = {
        isLoading: true
    }

    public componentDidMount() {
        this.loaded()
    }

    private loaded() {
        this.setState({
            isLoading: false
        });
    }

    public render() {
        return (
            <React.Fragment>
                <Row className="m-4">
                    <Col md="9" className="mt-3">
                        <CovidCountriesMap {...
                            {
                                location: {
                                    state: {
                                        data: this.props.location.state.data
                                    }
                                }
                            } as unknown as CovidCountriesMapProps} />                         
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}