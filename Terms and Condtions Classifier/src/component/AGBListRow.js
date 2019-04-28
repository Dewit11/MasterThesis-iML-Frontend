"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button, DialogContainer, SelectionControlGroup } from 'react-md';
import { SimpleLink } from './SimpleLink';


export class AGBListRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            method: 1
        };
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    show ()  {
        this.setState({ visible: true });
    };

    hide () {
        this.setState({ visible: false });
    };

    handleChange() {
        console.log("Methode", this.state.method)
    };
    render() {
        const { visible } = this.state;

        return (
            <TableRow key={this.props.key} >
                <TableColumn>{this.props.agb.id}</TableColumn>
                <TableColumn><SimpleLink to={`/detailView/${this.props.agb.id}`}>{this.props.agb.name}</SimpleLink></TableColumn>
                <TableColumn>{this.props.agb.paragraphIsLabeled ? <FontIcon>done</FontIcon> : <FontIcon>clear</FontIcon>}</TableColumn>
                <TableColumn>{this.props.agb.clauseIsLabeled ? <FontIcon>done</FontIcon> : <FontIcon>clear</FontIcon>}</TableColumn>
                {this.props.agb.paragraphIsLabeled ?
                <TableColumn><Button onClick={this.show} icon>arrow_forward</Button>
                    <DialogContainer
                    id="simple-list-dialog"
                    visible={visible}
                    title="Choose Model for Prediction"
                    width={500}
                    height={520}
                    onHide={this.hide}
                    focusOnMount={false}>
                        <SelectionControlGroup
                            id="selection-control-group-radios"
                            name="radio-example"
                            type="radio"
                            defaultValue="1"
                            onChange={test => this.setState({method : test})}
                            controls={[{
                                label: 'Cosine Similarity',
                                value: '1',
                            }, {
                                label: 'Most Unique Classes',
                                value: '2',
                            }, {
                                label: 'Logistic Regression!',
                                value: '3',
                            }, {
                                label: 'Linear Discriminant Analysis',
                                value: '4',
                            }, {
                                label: 'K-Nearest-Neighbors',
                                value: '5',
                            }, {
                                label: 'Decision Tree',
                                value: '6',
                            }, {
                                label: 'Gaussian NB',
                                value: '7',
                            }, {
                                label: 'Best Model based on Precision',
                                value: '8',
                            }, {
                                label: 'Correct from Classified State',
                                value: '9',
                            }

                            ]}
                        />
                        <Button href={"/#/match/clauses/" + this.props.agb.id +"/"+ this.state.method}
                                  raised
                                  style={{padding:"8px" , width: "150px"}}
                                  onClick={this.handleChange}>Classify Clauses</Button><br/>
                        <Button href={"/#/match/paragraphs/" + this.props.agb.id +"/"+ this.state.method}
                                raised
                                style={{padding:"8px" , width: "150px"}}
                                onClick={this.handleChange}>Redo Paragraphs</Button>
                </DialogContainer></TableColumn> :
                    <TableColumn>
                        <Button href={"/#/match/paragraphs/" + this.props.agb.id +"/2"}
                                onClick={this.handleChange}
                                icon>arrow_forward</Button>
                    </TableColumn>}

            </TableRow>

        );
    }
}