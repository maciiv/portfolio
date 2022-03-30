import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChartMargin } from '../../assets/js/CustomMethods';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import * as d3 from 'd3';
import { CovidData } from '../../store/Covid';
import CovidCountriesMap, { CovidCountriesMapProps } from './CovidCountriesMap';

export type CovidCountriesProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>

export default class CovidCountries extends React.PureComponent<CovidCountriesProps, {
    width: number,
    height: number,
    margin: ChartMargin,
    data: d3.HierarchyNode<CovidData>,
    isLoading: boolean
}> {
    ref = React.createRef<HTMLDivElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 30, bottom: 30, left: 80 } as ChartMargin,
        data: {} as d3.HierarchyNode<CovidData>,
        isLoading: true
    }

    public componentDidMount() {
        this.renderTreeMap()
    }

    private renderTreeMap() {
        if (this.ref.current === null) return;
        const width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        const height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;
        console.log(this.props.location.state.data)
        let test = d3.stratify<CovidData>()
            .id(d => d.country)
            .parentId(d => d.continent)
            (this.props.location.state.data)
        console.log(test)
        this.setState({
            width: width,
            height: height,
            data: test,
            isLoading: false
        });
    }

    public render() {
        return (
            <React.Fragment>
                <Row className="m-4">
                    <Col md="12" className="mt-3">
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