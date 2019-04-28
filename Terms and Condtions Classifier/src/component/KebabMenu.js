"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { Button, MenuButton, ListItem, Avatar, FontIcon } from 'react-md';
import { withRouter } from 'react-router-dom'


class KebabMenu extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MenuButton
                id={this.props.id}
                icon
                className={this.props.className}
                menuItems={
                    [
                        <ListItem key={1} primaryText="New Company" onClick={() => this.props.history.push('/newCompany')}/>,
                        <ListItem key={2} primaryText="Data Overview" onClick={() => this.props.history.push('/data')}/>
                    ]
                }
            >
                more_vert
            </MenuButton>
        );
    }
}

KebabMenu.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    menuItems: PropTypes.array
};

export default withRouter(KebabMenu);