import * as React from 'react';
import { Container } from 'reactstrap';

export default class Footer extends React.PureComponent {
    public render() {
        return (
            <div>
                <div id="footer" className="text-center">
                    <Container>
                        <div className="socials-media text-center">
                            <ul className="list-unstyled">
                                <li><a href="https://orcid.org/0000-0002-9747-4266"><img style={{ width: 26.4, height: 34.4 }} src="assets/img/orcid-logo-icon.svg" alt="OrcID" /></a></li>
                                <li><a href="https://au.linkedin.com/in/miguel-canizares"><i className="bi bi-linkedin"></i></a></li>
                                <li><a href="https://twitter.com/mcanizaresmena"><i className="bi bi-twitter"></i></a></li>
                                <li><a href="https://research.qut.edu.au/qutcds/staff/miguel-canizares/"><img style={{ width: 65.4, height: 34.4 }} src="assets/img/qut-logo.png" alt="QUT" /></a></li>
                                <li><a href="https://scholar.google.com.au/citations?user=5afmF3IAAAAJ&hl=en&oi=ao">Google Scholar</a></li>
                            </ul>
                        </div>
                        <p>&copy; Copyrights Folio. All rights reserved.</p>
                        <div className="credits">
                            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                        </div>
                    </Container>
                </div>
                <a href="#" className="back-to-top d-flex align-items-center justify-content-center active"><i className="bi bi-arrow-up-short"></i></a>
            </div>
        );
    }
}
