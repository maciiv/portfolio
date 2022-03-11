import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row, Table } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as TriviaWinnersStore from '../../store/TriviaWinners';

type TriviaWinnersProps =
    TriviaWinnersStore.TriviaWinnersState
    & typeof TriviaWinnersStore.actionCreators;

class TriviaWinners extends React.PureComponent<TriviaWinnersProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="my-3">
                        <Col md="12" className="d-flex">
                            <h3>You completed the trivia in {this.props.totalMinutes} minutes and {this.props.totalSeconds} seconds</h3>
                        </Col>
                        <Col md="12" className="mt-5">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <td>User name</td>
                                        <td>Score</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.winners.map((winners: TriviaWinnersStore.TriviaWinners) =>
                                        <tr>
                                            <td>{winners.user}</td>
                                            <td>{winners.score}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md="12" className="d-flex mt-5">
                            <a href="/webapps/trivia" className="btn btn-primary btn-block w-25 mx-auto">Go back to trivia home</a>
                        </Col>
                    </Row>                   
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.finishTrivia();
    }
};

export default connect(
    (state: ApplicationState) => state.triviaWinners,
    TriviaWinnersStore.actionCreators
)(TriviaWinners as any);