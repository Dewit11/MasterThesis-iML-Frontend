"use strict";

import React from 'react';
import { TableRow, TableColumn } from 'react-md';

export class ClauseListRow extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <TableRow key={this.props.key} >
                <TableColumn>{this.props.index}</TableColumn>
                <TableColumn>{this.props.clause}</TableColumn>
            </TableRow>

        );
    }
}