import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Col, Container, Row } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as TriviaQuestionsStore from '../../store/TriviaQuestions';
import Timer from '../Timer';

type TriviaQuestionsProps =
    TriviaQuestionsStore.TriviaQuestionsState
    & typeof TriviaQuestionsStore.actionCreators
    & RouteComponentProps<{ category: string }>;

class TriviaQuestions extends React.PureComponent<TriviaQuestionsProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    {this.props.currentQuestionIndex < this.props.questions.length ?
                        <Row className="my-5">
                            <Col md="6" className="d-flex mr-auto">
                                <h5 className="mr-auto">Question {this.props.currentQuestionIndex + 1} of {this.props.questions.length}</h5>
                            </Col>
                            <Col md="6" className="d-flex mb-5">
                                <h5 className="ml-auto">Your time <Timer /></h5>                                
                            </Col>
                            <Col md="12" className="d-flex mb-5">
                                <h3 className="mx-auto">{this.props.questions[this.props.currentQuestionIndex].question}</h3>
                            </Col>
                            {this.props.questions[this.props.currentQuestionIndex].options.map((option: TriviaQuestionsStore.TriviaOptions) => this.renderOptions(option))}
                        </Row> : ""    
                    }
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const category = this.props.match.params.category
        this.props.requestTriviaQuestions(category);
    }

    private nextQuestion(isCorrect: boolean) {

        this.props.requestNextTriviaQuestion(isCorrect);
    }

    private renderOptions(option: TriviaQuestionsStore.TriviaOptions) {
        return (
            <Col md="6" className="d-flex my-3">
                <Button className="mx-auto w-50" onClick={() => this.nextQuestion(option.isCorrect)}>{option.option}</Button>
            </Col>
        )
    }
};

export default connect(
    (state: ApplicationState) => state.triviaQuestions,
    TriviaQuestionsStore.actionCreators
)(TriviaQuestions as any);