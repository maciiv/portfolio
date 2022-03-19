import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type ContentContainerProps =
    RouteComponentProps<{}, {}, { width: number, height: number, translateX: number, translateY: number }>;

export default class ContentContainer extends React.PureComponent<ContentContainerProps> {
    ref = React.createRef<SVGClipPathElement>();

    public render() {
        return (
            <g transform={`translate(${this.props.location.state.translateX}, ${this.props.location.state.translateY})`} clipPath={`url(#${this.ref})`}>
                <rect className="zoom" width={this.props.location.state.width} height={this.props.location.state.height} />
                <clipPath ref={this.ref}>
                    <rect x="1" width={this.props.location.state.width} height={this.props.location.state.height} />
                </clipPath>
            </g>
        )
    }
}