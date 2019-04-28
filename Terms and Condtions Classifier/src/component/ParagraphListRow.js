"use strict";

import React from 'react';
import { TableRow, TableColumn, Button, FontIcon } from 'react-md';

export class ParagraphListRow extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <TableRow key={this.props.key} >
                <TableColumn>{this.props.clause.rawText}</TableColumn>
                <TableColumn>{this.props.clause.trueState === null ? <FontIcon>clear</FontIcon> :
                    <Button href={"/#/class/clause/" + this.props.clause.trueState}
                                     icon>arrow_forward</Button>}
                </TableColumn>
            </TableRow>

        );
    }
}
