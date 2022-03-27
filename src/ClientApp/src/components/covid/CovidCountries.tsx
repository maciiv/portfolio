import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ChartMargin } from '../../assets/js/CustomMethods';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Row, Spinner } from 'reactstrap';
import * as d3 from 'd3';
import { CovidData } from '../../store/Covid';

export type CovidCountriesProps =
    RouteComponentProps<{}, {}, { data: CovidData[] }>

export default class CovidCountries extends React.PureComponent<CovidCountriesProps, {
    width: number,
    height: number,
    margin: ChartMargin,
    data: CovidData[],
    isLoading: boolean
}> {
    ref = React.createRef<HTMLDivElement>();
    public state = {
        width: 0,
        height: 0,
        margin: { top: 10, right: 30, bottom: 30, left: 80 } as ChartMargin,
        data: this.props.location.state.data,
        isLoading: true
    }

    public componentDidMount() {
        this.renderTreeMap()
    }

    private renderTreeMap() {
        if (this.ref.current === null) return;
        let width = this.ref.current.getBoundingClientRect().width - this.state.margin.left - this.state.margin.right;
        let height = this.ref.current.getBoundingClientRect().height - this.state.margin.top - this.state.margin.bottom;
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <Spinner /> :
                    <Row className="m-4">
                        <Col md="12" className="mt-3">
                            {this.state.isLoading ? <Spinner /> :
                                <svg preserveAspectRatio="xMinYMin meet" viewBox={`0 0 ${this.state.width + this.state.margin.left + this.state.margin.right} ${this.state.height + this.state.margin.top + this.state.margin.bottom}`}>
                                </svg>}
                        </Col>
                    </Row>
                }
            </React.Fragment>
        );
    }
}