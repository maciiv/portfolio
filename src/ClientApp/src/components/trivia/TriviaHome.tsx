import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardText, CardTitle, Col, Container, Input, Row } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as TriviaHomeStore from '../../store/TriviaHome';

type TriviaHomeProps =
    TriviaHomeStore.TriviaHomeState
    & typeof TriviaHomeStore.actionCreators

class TriviaHome extends React.PureComponent<TriviaHomeProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="my-3">
                        <Col md="12" className="d-flex">
                            <h3 className="mx-auto">Insert your name below</h3>
                        </Col>
                        <Col md="12" className="d-flex">
                            <Input type="text" className="mx-auto w-25" />
                        </Col>
                        <Col md="12">
                            <h3 className="my-3 mx-auto">Select the category you want to play!</h3>
                        </Col>
                        {this.props.trivia.map((trivia: TriviaHomeStore.Trivia) =>
                            <Col>
                                {this.renderCard(trivia)}
                            </Col>
                        )}
                    </Row>
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestTrivia();
    }

    private renderCard(trivia: TriviaHomeStore.Trivia) {
        return (
            <Card>
                <CardBody>
                    <CardTitle tag="h5">
                        {trivia.category}
                    </CardTitle>
                    <CardText>
                        How much do you know about {trivia.category.toLowerCase()}? If you think you are a specialist in this category, try answering {trivia.questions.length} questions and test yourself 
                    </CardText>
                    <Link to={`/webapps/trivia-questions/${trivia.category}`} className="btn btn-primary">
                        Select
                    </Link>
                </CardBody>
            </Card>
        )
    }
};

export default connect(
    (state: ApplicationState) => state.triviaHome,
    TriviaHomeStore.actionCreators
)(TriviaHome as any);