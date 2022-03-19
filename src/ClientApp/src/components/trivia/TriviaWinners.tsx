import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import * as Trivia from '../../store/Trivia';

type TriviaWinnersProps =
    RouteComponentProps<{}, {}, { userName: string, score: number, minutes: number, seconds: number }>

export default class TriviaWinners extends React.PureComponent<TriviaWinnersProps, { winners: Trivia.TriviaWinners[] }> {
    public state = {
        winners: [] as Trivia.TriviaWinners[]
    }

    public componentDidMount() {
        this.finishTrivia();
    }

    private finishTrivia() {
        fetch(`trivia/winners`, {
            method: 'POST',
            body: JSON.stringify({ 'user': this.props.location.state.userName, 'score': this.props.location.state.score }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json() as Promise<Trivia.TriviaWinners[]>)
            .then(data => {
                this.setState({
                    winners: data
                })
            })
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="my-3">
                        <Col md="12" className="d-flex">
                            <h3>You completed the trivia in {this.props.location.state.minutes} minutes and {this.props.location.state.seconds} seconds</h3>
                        </Col>
                        <Col md="12" className="mt-5">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>User name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.winners.map((winners: Trivia.TriviaWinners) =>
                                        <tr>
                                            <td>{winners.user}</td>
                                            <td>{winners.score}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md="12" className="d-flex mt-5">
                            <Link to="/webapps/trivia" className="btn btn-primary btn-block w-25 mx-auto">Go back to trivia home</Link>
                        </Col>
                    </Row>                   
                </Container>
            </React.Fragment>
        );
    }
};