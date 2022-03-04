import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import Hero from './Hero';
import PortfolioItems from './PortfolioItems';

const Home = () => {
    const renderAbout = () => {
        return (
            <div id="about" className="paddsection">
                <Container>
                    <Row className="justify-content-between">
                        <Col lg="4">
                            <div className="div-img-bg">
                                <div className="about-img">
                                    <img src="assets/img/me.jpg" className="img-responsive" alt="me" />
                                </div>
                            </div>
                        </Col>
                        <Col lg="7">
                            <div className="about-descr">
                                <p className="p-heading">I'm a researcher/developer passionate about understanding the human-computer interaction from a holistic point of view. </p>
                                <p className="separator">Data is not as simple as numbers, there is an intrinsic relationship with the people who is represented by the data. The data collected only represents part of the people's context. In addition, the person reading the data might have different understandings of the data and its context. However, this is rarely acknowledged in research and practice. My aim is bring this to the forefront and develop solutions with a human-centred approach.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    const renderServices = () => {
        return (
            <div id="services">
                <Container>
                    <Row>
                        <Col lg="3" className="swiper-slide">
                            <div className="services-block">
                                <i className="bi bi-binoculars"></i>
                                <span>RESEARCH</span>
                                <p className="separator">Human-computer interaction research with a human-centric approach </p>
                            </div>
                        </Col>
                        <Col lg="3" className="swiper-slide">
                            <div className="services-block">
                                <i className="bi bi-briefcase"></i>
                                <span>UI/UX DESIGN</span>
                                <p className="separator">Human-centred design to build solutions with people not for people </p>
                            </div>
                        </Col>
                        <Col lg="3" className="swiper-slide">
                            <div className="services-block">
                                <i className="bi bi-bar-chart"></i>
                                <span>WEB DEVELOPMENT</span>
                                <p className="separator">Full-stack web development with cutting-edge methods such as participatory design </p>
                            </div>
                        </Col>
                        <Col lg="3" className="swiper-slide">
                            <div className="services-block">
                                <i className="bi bi-brightness-high"></i>
                                <span>Analytics</span>
                                <p className="separator">Analytics with interactive data visualisations to bring context to the data </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    const renderPublications = () => {
        return (
            <div id="publications" className="paddsection">
                <Container>
                    <div className="section-title text-center">
                        <h2>My Publications</h2>
                    </div>
                </Container>
                <Container>
                    <Row>
                        <Col lg="12" className="d-flex justify-content-center">
                            <ul>
                                <li>Canizares Mena, M. A, & Isaias, P. T. (2019). Gathering researchers’ requirements to develop a learning technologies dashboard. In <i>Proceedings of the 12th IADIS International Conference Information Systems 2019, IS 2019</i> (pp. 51-59). IADIS Press.</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    const renderBlog = () => {
        return (
            <div id="journal" className="text-left paddsection">
                <Container>
                    <div className="section-title text-center">
                        <h2>journal</h2>
                    </div>
                </Container>
                <Container>
                    <div className="journal-block">
                        <Row>
                            <Col lg="4" md="6">
                                <div className="journal-info">
                                    <a href="blog-single.html"><img src="assets/img/blog-post-1.jpg" className="img-responsive" alt="img" /></a>
                                    <div className="journal-txt">
                                        <h4><a href="blog-single.html">SO LETS MAKE THE MOST IS BEAUTIFUL</a></h4>
                                        <p className="separator">To an English person, it will seem like simplified English
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" md="6">
                                <div className="journal-info">
                                    <a href="blog-single.html"><img src="assets/img/blog-post-2.jpg" className="img-responsive" alt="img" /></a>
                                    <div className="journal-txt">
                                        <h4><a href="blog-single.html">WE'RE GONA MAKE DREAMS COMES</a></h4>
                                        <p className="separator">To an English person, it will seem like simplified English
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4" md="6">
                                <div className="journal-info">
                                    <a href="blog-single.html"><img src="assets/img/blog-post-3.jpg" className="img-responsive" alt="img" /></a>
                                    <div className="journal-txt">
                                        <h4><a href="blog-single.html">NEW LIFE CIVILIZATIONS TO BOLDLY</a></h4>
                                        <p className="separator">To an English person, it will seem like simplified English
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    }

    const renderContact = () => {
        return (
            <div id="contact" className="paddsection">
                <Container>
                    <Row>
                        <Col lg="6">
                            <div className="contact-contact">
                                <h2 className="mb-30">GET IN TOUCH</h2>
                                <ul className="contact-details">
                                    <li><span>Gardens Points, Block Y</span></li>
                                    <li><span>Queensland University of Technology</span></li>
                                    <li><span>Queensland, Australia</span></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg="6">
                            <Form>
                                <Row form>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Input type="text" name="name" id="name" placeholder="Your Name" required />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <Input type="email" name="email" id="email" placeholder="Your Email" required />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="12">
                                        <FormGroup>
                                            <Input type="text" name="subject" id="subject" placeholder="Subject" required />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="12">
                                        <FormGroup>
                                            <Input type="textarea" className="form-control" name="message" placeholder="Message" required />
                                        </FormGroup>
                                    </Col>
                                    <Col lg="12">
                                        <div className="loading">Loading</div>
                                        <div className="error-message"></div>
                                        <div className="sent-message">Your message has been sent. Thank you!</div>
                                    </Col>
                                    <Col lg="12" className="mt-0">
                                        <Button className="btn btn-defeault btn-block w-100">Send Message</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

    return (
        <div>
            <Hero />
            <main id="main">
                {renderAbout()}
                {renderServices()}
                {renderPublications()}
                <PortfolioItems />
                {renderContact()}               
            </main> 
        </div>
    )
};

export default connect()(Home);
