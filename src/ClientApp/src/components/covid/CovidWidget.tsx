import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';

export type CovidWidgetProps = 
    RouteComponentProps<{}, {}, { name: string, number: number }>;

export default class CovidWidget extends React.PureComponent<CovidWidgetProps> {

    public render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle className="d-flex"><span className="mx-auto">{this.props.location.state.number}</span></CardTitle>
                    <CardSubtitle className="mb-2 text-muted d-flex"><span className="mx-auto">{this.props.location.state.name}</span></CardSubtitle>
                </CardBody>
            </Card>
            )
    }
}