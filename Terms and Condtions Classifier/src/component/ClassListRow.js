"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button, DialogContainer, SelectionControlGroup } from 'react-md';
import { SimpleLink } from './SimpleLink';



export class ClassListRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.getAgbID = this.getAgbID.bind(this)
    }
    componentDidMount(){
        this.getAgbID(this.props.clause.id)
    }
    getAgbID(id){
        fetch('http://localhost:5000/getAgbId/'+ this.props.flag +'/' + id, {
            method : 'GET',
            header : 'Access-Control-Allow-Origin'
        }).then(res => res.json()
        ).then(response => {
            this.setState({
                data: response,
            });
        });

    }

    render() {

        return (
            <TableRow key={this.props.key} >
                <TableColumn>{this.props.index}</TableColumn>
                {this.props.flag === "clause" ? <TableColumn>{this.props.clause.rawText}</TableColumn> :
                    <TableColumn>{this.props.clause.title}</TableColumn>}

                <TableColumn><SimpleLink to={`/detailView/${this.state.data.agb_id}`}>{this.state.data.agb_id}</SimpleLink></TableColumn>
            </TableRow>

        );
    }
}
