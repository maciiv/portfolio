import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { ApplicationState } from '../store';
import * as HeroStore from '../store/Hero';

type HeroProps =
    HeroStore.HeroState
    & typeof HeroStore.actionCreators

class Hero extends React.PureComponent<HeroProps> {
    public componentDidMount() {
        this.startHero();
    }

    public render() {
        return (
            <React.Fragment>
                <div id="hero" className="home">
                    <Container>
                        <div className="hero-content">
                            <h1>I'm <span className="typed">{this.props.text}</span>{!this.props.isDone ? <span className="typed-cursor"></span> : ""}</h1>
                            <p>Researcher, Designer, Developer, Freelancer</p>
                            <ul className="list-unstyled list-social">
                                <li><a href="https://orcid.org/0000-0002-9747-4266"><img style={{ width: 15.31, height: 21.6 }} src="assets/img/orcid-logo-icon.svg" alt="OrcID" /></a></li>
                                <li><a href="https://au.linkedin.com/in/miguel-canizares"><i className="bi bi-linkedin"></i></a></li>
                                <li><a href="https://twitter.com/mcanizaresmena"><i className="bi bi-twitter"></i></a></li>
                                <li><a href="https://research.qut.edu.au/qutcds/staff/miguel-canizares/"><img style={{ width: 45.31, height: 21.6 }} src="assets/img/qut-logo.png" alt="QUT" /></a></li>
                                <li><a href="https://scholar.google.com.au/citations?user=5afmF3IAAAAJ&hl=en&oi=ao">Google Scholar</a></li>
                            </ul>
                        </div>
                    </Container>
                </div>
            </React.Fragment>
        );
    }

    private async startHero() {
        await this.props.writeHero("Miguel Canizares");
        await this.props.deleteHero();
        await this.props.writeHero("A Researcher");
        await this.props.deleteHero();
        await this.props.writeHero("A Designer");
        await this.props.deleteHero();
        await this.props.writeHero("A Developer");
        await this.props.deleteHero();
        await this.props.writeHero("A Freelancer");
        await this.props.deleteHero();
        await this.props.writeHero("Miguel Canizares", true);
    }
};

export default connect(
    (state: ApplicationState) => state.hero,
    HeroStore.actionCreators
)(Hero as any);