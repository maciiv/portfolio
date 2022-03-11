import * as React from 'react';
import { Container } from 'reactstrap';

export default class Hero extends React.PureComponent<{}, { text: string, isDone: boolean }> {
    public state = {
        text: "",
        isDone: false
    }

    public componentDidMount() {
        this.startHero();
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
        await new Promise(r => setTimeout(r, 500));
        let letters = text.split('');
        let i = 0;
        while (i < letters.length) {
            await new Promise(r => setTimeout(r, 100));
            let currentText = this.state.text;
            this.setState({ text: currentText.concat(letters[i]) });
            i++
        }
        if (isDone) {
            this.setState({ isDone: true });
        }
    }

    private async deleteHero() {
        await new Promise(r => setTimeout(r, 3000));
        let letters = this.state.text;
        let i = letters.length;
        while (i >= 0) {
            await new Promise(r => setTimeout(r, 100));
            this.setState({ text: letters.substr(0, i) })
            i--
        }
    }
};