"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button, DialogContainer } from 'react-md';

import { DroppableRowElement } from './DroppableRowElement';

export class MatchingListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TableRow key={this.props.key}>
                <TableColumn>Grundwahrheit Klausel 1</TableColumn>
                <TableColumn><DroppableRowElement key={this.props.key} element="Klasse" clauses="Klauseln mit Startpunkt der Grundwahrheitsklausel"/></TableColumn>
            </TableRow>
        )
    }
}