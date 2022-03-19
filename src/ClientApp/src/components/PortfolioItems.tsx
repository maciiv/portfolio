import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { ApplicationState } from '../store';
import * as PortfolioItemsStore from '../store/PortfolioItems';

type PortfolioItemsProps =
    PortfolioItemsStore.PortfolioItemsState
    & typeof PortfolioItemsStore.actionCreators

class PortfolioItems extends React.PureComponent<PortfolioItemsProps> {
    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <div id="portfolio" className="paddsection">
                    <Container>
                        <div className="section-title text-center">
                            <h2>My Portfolio</h2>
                        </div>
                    </Container>
                    <Container>
                        {this.renderFilters()}
                        {this.renderPortfolioItems()}
                    </Container>
                </div>
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestPortfolioItems()
    }

    private filter(filter?: string) {
        this.props.filterPortfolioItems(filter);
    }

    private renderFilters() {
        return (
            <Row>
                <Col lg="12" className="d-flex justify-content-center">
                    <ul id="portfolio-flters">
                        <li onClick={() => this.filter()} className={this.props.filter === undefined ? "filter-active" : ""}>All</li>
                        <li onClick={() => this.filter("visualisation")} className={this.props.filter === "visualisation" ? "filter-active" : ""}>Visualisations</li>
                        <li onClick={() => this.filter("web")} className={this.props.filter === "web" ? "filter-active" : ""}>WebApps</li>
                    </ul>
                </Col>
            </Row>
        )
    }

    private renderPortfolioItems() {
        return (
            <Row>
                {this.props.filteredItems.map((item: PortfolioItemsStore.PortfolioItem) => 
                    <Col lg="4" md="6" className="portfolio-item">
                        <img src={item.imageUrl} className="img-fluid" alt="" />
                        <div className="portfolio-info">
                            <Row>
                                <Col lg="9" md="8">
                                    <h4>{item.name}</h4>
                                </Col>
                                <Col lg="3" md="4">
                                    <a href={item.gitHubUrl} className="preview-link" title="GitHub page"><i className="bx bxl-github"></i></a>
                                    <Link to={item.itemUrl} className="details-link" title="More details"><i className="bx bx-link"></i></Link>
                                </Col>
                            </Row>                         
                            <p>{item.description}</p>                           
                        </div>
                    </Col>
                )}
            </Row>
        )
    }
};

export default connect(
    (state: ApplicationState) => state.portfolioItems,
    PortfolioItemsStore.actionCreators
)(PortfolioItems as any);