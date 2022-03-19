import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import * as Trivia from '../../store/Trivia';
import Timer, { TimerProps, Time } from '../Timer';

type TriviaQuestionsProps = 
    RouteComponentProps<{}, {}, { questions: Trivia.TriviaQuestions[], userName: string }>

export default class TriviaQuestions extends React.PureComponent<TriviaQuestionsProps, { index: number, score: number, time: Time }> {
    public state = {
        index: 0,
        score: 0,
        time: {} as Time
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    {this.state.index < this.props.location.state.questions.length ?
                        <Row className="my-5">
                            <Col md="6" className="d-flex md-5">
                                <h5 className="mr-auto">Question {this.state.index + 1} of {this.props.location.state.questions.length}</h5>
                            </Col>
                            <Col md="6" className="d-flex mb-5">
                                <h5 className="ml-auto">Your time <Timer {...{ location: { state: { time: this.getTime.bind(this) } } } as unknown as TimerProps } /></h5>                                
                            </Col>
                            <Col md="12" className="d-flex mb-5">
                                <h3 className="mx-auto">{this.props.location.state.questions[this.state.index].question}</h3>
                            </Col>
                            {this.props.location.state.questions[this.state.index].options.map((option: Trivia.TriviaOptions) => this.renderOptions(option))}
                        </Row> :
                        <Row className="my-5">
                            <Col md="12" className="d-flex">
                                <Link to={{ pathname: "/webapps/trivia/finish", state: { userName: this.props.location.state.userName, score: this.state.score, minutes: this.state.time.minutes, seconds: this.state.time.seconds } }} className="btn btn-primary w-25 mx-auto">View your score!</Link>                              
                            </Col>
                        </Row>
                    }
                </Container>
            </React.Fragment>
        );
    }

    private nextQuestion(isCorrect: boolean) {
        this.setState({
            index: this.state.index + 1,
            score: isCorrect ? this.state.score + 1 : this.state.score
        });       
    }

    private getTime(timerTime: Time) {
        this.setState({
            time: timerTime
        })
    }

    private renderOptions(option: Trivia.TriviaOptions) {
        return (
            <Col md="6" className="d-flex my-3">
                <Button className="mx-auto w-50" onClick={() => this.nextQuestion(option.isCorrect)}>{option.option}</Button>
            </Col>
        )
    }
};