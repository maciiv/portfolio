import * as React from 'react';
import { Container } from 'reactstrap';
import * as CustomMethods from '../assets/js/CustomMethods';

export default class Hero extends React.PureComponent<{}, { text: string, isDone: boolean }> {
    writeTimeout: number
    deleteTimeout: number
    letterPromise: CustomMethods.ICancelablePromise<void>
    startHeroPromise: CustomMethods.ICancelablePromise<void>

    public state = {
        text: "",
        isDone: false
    }

    public componentDidMount() {
        this.writeHero("Miguel Canizares");
    }

    public componentWillUnmount() {
        this.letterPromise.cancel();
        clearTimeout(this.writeTimeout)
        clearTimeout(this.deleteTimeout);
    }

    public render() {
        return (
            <React.Fragment>
                <div id="hero" className="home">
                    <Container>
                        <div className="hero-content">
                            <h1>I'm <span className="typed">{this.state.text}</span>{!this.state.isDone ? <span className="typed-cursor"></span> : ""}</h1>
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
        await this.writeHero("Miguel Canizares");
        await this.deleteHero();
        await this.writeHero("A Researcher");
        await this.deleteHero();
        await this.writeHero("A Designer");
        await this.deleteHero();
        await this.writeHero("A Developer");
        await this.deleteHero();
        await this.writeHero("A Freelancer");
        await this.deleteHero();
        await this.writeHero("Miguel Canizares", true);
    }

    private async writeHero(text: string, isDone?: boolean) {
        this.writeTimeout = setTimeout( async () => {
            let letters = text.split('');
            for (let i = 0; i < text.length; i++) {
                this.letterPromise = new CustomMethods.CancelablePromise(new Promise(r => setTimeout(r, 100)));
                await this.letterPromise
                    .promise
                    .then(() => {
                        let currentText = this.state.text;
                        this.setState({ text: currentText.concat(letters[i]) });
                    })
                    .catch(reason => console.log('isCancealed', reason.isCanceled))
            }
            if (isDone) {
                this.setState({ isDone: true });
            }
        }, 500)
        
    }

    private async deleteHero() {
        this.deleteTimeout = setTimeout( async () => {
            let letters = this.state.text;
            for (let i = letters.length; i >= 0; i--) {
                this.letterPromise = new CustomMethods.CancelablePromise(new Promise(r => setTimeout(r, 100)));
                await this.letterPromise
                    .promise
                    .then(() => {
                        this.setState({ text: letters.substr(0, i) })
                    })
                    .catch(reason => console.log('isCancealed', reason.isCanceled))
            }
        }, 3000)
    }
};