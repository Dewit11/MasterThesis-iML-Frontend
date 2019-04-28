"use strict";

import React from 'react';
import Styled from 'styled-components';


class PlainFooter extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.className}>

                <p>© {new Date().getFullYear()} sebis. All rights reserved.</p>
            </div>
        );
    }
}

export const Footer = Styled(PlainFooter)`
    max-height: 25px;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background: #3F51B5;
    > p {
        text-align: center;
        margin-top: 1px;
    }
`;