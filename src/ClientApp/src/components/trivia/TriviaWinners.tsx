import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row, Table } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as TriviaWinnersStore from '../../store/TriviaWinners';
import * as TimerStore from '../../store/Timer';

type TriviaWinnersProps =
    TriviaWinnersStore.TriviaWinnersState
    & typeof TriviaWinnersStore.actionCreators
    & typeof TimerStore.actionCreators;

class TriviaWinners extends React.PureComponent<TriviaWinnersProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    <Row className="my-3">
                        <Col md="12" className="d-flex my-5">
                            <h4>You completed the trivia in {this.props.totalMinutes} minutes and {this.props.totalSeconds} seconds</h4>
                        </Col>
                        <Col md="12" className="mt-5">
                            <Table hover>
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
                    </Row>                   
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.finishTrivia();
        this.props.stopTimer();
    }
};

export default connect(
    (state: ApplicationState) => state.triviaWinners,
    TriviaWinnersStore.actionCreators
)(TriviaWinners as any);