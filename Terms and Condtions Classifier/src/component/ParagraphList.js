"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, ListItem } from 'react-md';
import {ParagraphListRow} from "../component/ParagraphListRow";
import { SimpleLink } from './SimpleLink';

export class ParagraphList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentWillMount(){
        let id = this.props.paragraph.id;
        this.getClauses(id)
    }

    getClauses(id){
        fetch('http://localhost:5000/clausesFromParagraph/' + id, {
            method : 'GET',
            header : 'Access-Control-Allow-Origin'
        }).then(res => res.json()
        ).then(response => {
            this.setState({
                data: [...response]
            });
        });

    }
    render(){
        console.log("Data state:", this.state.data)
        return(
            <div><br/>
                <SimpleLink to={`/class/paragraph/${this.props.paragraph.trueState}`}><h3>{this.props.paragraph.title}</h3></SimpleLink>
                <DataTable plain >
                    {this.props.index === 0 ?
                    <TableHeader>
                        <TableRow>
                            <TableColumn>Clause</TableColumn>
                            <TableColumn>Clauses in same Class</TableColumn>
                        </TableRow>
                    </TableHeader> : ""}
                    <TableBody>
                        {(this.state.data).map((clause, i) => <ParagraphListRow key={i} clause={clause} />)}
                    </TableBody>
                </DataTable>
            </div>

        );
    }
}