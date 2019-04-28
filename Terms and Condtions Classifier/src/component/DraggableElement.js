"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, Button, DialogContainer } from 'react-md';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
border : 1px solid black; 
padding: 8px; 
borderRadius: 2px;
margin-Bottom: 8px;
background-Color: white;
`;
export class DraggableElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            paragraphLoaded: false
        };
        this.getParagraphs = this.getParagraphs.bind(this)
    }
    componentDidMount(){
        this.getParagraphs(this.props.clause.id)
    }
    getParagraphs(id){
        fetch('http://localhost:5000/paragraphsFromClause/' + id, {
            method : 'GET',
            header : 'Access-Control-Allow-Origin'
        }).then(res => res.json()
        ).then(response => {
            this.setState({
                data: response,
                paragraphLoaded: true
            });
        });

    }
    render(){
        return(
            <Draggable draggableId={this.props.clause.id} index={this.props.index}>
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef = {provided.innerRef}
                        >
                        {this.state.paragraphLoaded === false ? <b>Paragraph</b> :
                        <b>{this.state.data.title} --- Klasse: {this.state.data.trueState}</b>} <br/>
                        {this.props.clause.rawText}
                    </Container>
                )}

            </Draggable>
        )
    }
}

