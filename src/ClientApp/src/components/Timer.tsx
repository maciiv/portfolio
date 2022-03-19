import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


export type TimerProps =
    RouteComponentProps<{}, {}, { time?: Function }>;

export interface Time {
    minutes: number,
    seconds: number
}

export default class Timer extends React.PureComponent<TimerProps, { isActive: boolean, time: Time }> {
    timerInterval: number
    public state = {
        isActive: false,
        time: {minutes: 0, seconds: 0} as Time,
    }

    public componentDidMount() {
        this.startTimer();
    }

    public compo

    public componentWillUnmount() {       
        if (this.props.location !== undefined) {
            this.props.location.state.time({ minutes: this.state.time.minutes, seconds: this.state.time.seconds });
        }
        this.stopTimer();
    }

    public render() {
        return (
            <React.Fragment>
                {this.state.time.minutes < 10 ? "0" : ""}{this.state.time.minutes}:{this.state.time.seconds < 10 ? "0" : ""}{this.state.time.seconds}
            </React.Fragment>
        );
    }

    private startTimer() {
        let seconds = this.state.time.seconds;
        let minutes = this.state.time.minutes;
        this.timerInterval = setInterval(() => {
            seconds += 1;
            if (seconds == 60) {
                minutes = + 1;
                seconds = 0;
            }
            this.setState({
                isActive: true,
                time: { minutes: minutes, seconds: seconds } as Time
            })
        }, 1000);
    }

    private stopTimer() {
        clearInterval(this.timerInterval);
        this.setState({
            isActive: false,
            time: { minutes: 0, seconds: 0 } as Time
        })
    }
};