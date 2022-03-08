import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TimerStore from '../store/Timer';

type TimerProps =
    TimerStore.TimerState
    & typeof TimerStore.actionCreators;

class Timer extends React.PureComponent<TimerProps> {
    public componentDidMount() {
        this.props.startTimer();
    }

    public componentWillUnmount() {
        this.props.stopTimer();
    }

    public render() {
        return (
            <React.Fragment>
                {this.props.minutes < 10 ? "0" : ""}{this.props.minutes}:{this.props.seconds < 10 ? "0" : ""}{this.props.seconds}
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.timer,
    TimerStore.actionCreators
)(Timer as any);