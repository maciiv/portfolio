import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle, Col, Container, Input, Row } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as TriviaStore from '../../store/Trivia';

type TriviaProps =
    TriviaStore.TriviaState
    & typeof TriviaStore.actionCreators;

class TriviaHome extends React.PureComponent<TriviaProps, { userName: string }> {
    public state = {
        userName: ""
    }

    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="my-3">
                        <Col md="12" className="d-flex mt-5">
                            <Input type="text" className="mx-auto w-50" placeholder="Insert your name to be able to select a category" onChange={(e) => this.setUserName(e)} />
                        </Col>
                        <Col md="12">
                            <h3 className="my-5 mx-auto">Select the category you want to play!</h3>
                        </Col>
                        {this.props.trivia.map((trivia: TriviaStore.Trivia) =>
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

    private setUserName(e) {
        this.setState({
            userName: e.target.value
        })
    }

    private renderCard(trivia: TriviaStore.Trivia) {
        return (
            <Card>
                <CardBody>
                    <CardTitle tag="h5">
                        {trivia.category}
                    </CardTitle>
                    <CardText>
                        How much do you know about {trivia.category.toLowerCase()}? If you think you are a specialist in this category, try answering {trivia.questions.length} questions and test yourself 
                    </CardText>
                    <Link to={{ pathname: `/webapps/trivia/questions`, state: { questions: trivia.questions, userName: this.state.userName } }} className={this.state.userName !== undefined && this.state.userName !== "" ? "btn btn-primary" : "btn btn-primary disabled"}>
                        Select
                    </Link>
                </CardBody>
            </Card>
        )
    }
};

export default connect(
    (state: ApplicationState) => state.trivia,
    TriviaStore.actionCreators
)(TriviaHome as any);