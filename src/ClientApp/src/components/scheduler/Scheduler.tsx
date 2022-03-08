import * as React from 'react';
import { connect } from 'react-redux';
import { Container, Table, UncontrolledAlert } from 'reactstrap';
import { ApplicationState } from '../../store';
import * as SchedulerStore from '../../store/Scheduler';

type SchedulerProps =
    SchedulerStore.SchedulerState
    & typeof SchedulerStore.actionCreators

class Scheduler extends React.PureComponent<SchedulerProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <Container>
                    <h1 className="my-3">Below is the scheduler for your motorcyclists</h1>
                    <h4 className="my-3">Select the time block that suits you better. If you change your mind, just click again and the time block will be free</h4>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2 className="my-3">{new Date().toDateString()}</h2>
                            <h4 className="my-3">Motorcyclists available {this.props.motorcyclists}</h4>
                            {this.props.hasUpdate ? this.renderAlert() : ""}
                        </div>
                    </div>
                    {this.renderTable()}
                </Container>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestScheduler();
    }

    private updateSchedule(schedule: SchedulerStore.Schedule) {
        if (this.props.motorcyclists == 0 && schedule.isAvailable) {
            return
        }
        schedule.isAvailable = !schedule.isAvailable;
        this.props.updateScheduler(schedule);
    }

    private renderTable() {
        return (
            <Table hover>
                <tbody>
                    {this.props.schedule.map((schedule: SchedulerStore.Schedule) =>
                        <tr key={schedule.id} className={schedule.isAvailable ? "" : "table-danger"} onClick={() => this.updateSchedule(schedule)}>
                            <td>{schedule.time}</td>
                            <td>{schedule.isAvailable ? "Is available" : "Is not available"}</td>
                        </tr>
                        )}
                </tbody>
            </Table>
        );
    }

    private renderAlert() {
        return (
            <UncontrolledAlert color={this.props.motorcyclists !== 0 ? "success" : "danger"}>
                {
                    this.props.motorcyclists !== 0 ? this.props.update < 0 ? "Motorcyclist assigned successfully" :
                         this.props.update > 0 ? "Motorcyclists removed successfully" : "" :
                            "Not available motorcyclists, please release one from the timetable and try again"}
            </UncontrolledAlert>
        )
    }
};

export default connect(
    (state: ApplicationState) => state.scheduler,
    SchedulerStore.actionCreators
)(Scheduler as any);