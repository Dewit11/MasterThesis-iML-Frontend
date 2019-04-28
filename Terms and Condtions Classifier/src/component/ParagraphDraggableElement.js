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
export class ParagraphDraggableElement extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Draggable draggableId={this.props.paragraph.id} index={this.props.index}>
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef = {provided.innerRef}
                        >
                        <b>{this.props.paragraph.title}</b>

                    </Container>
                )}

            </Draggable>
        )
    }
}

