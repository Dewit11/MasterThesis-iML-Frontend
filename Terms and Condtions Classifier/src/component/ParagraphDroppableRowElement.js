"use strict";

import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

import { ParagraphDraggableElement } from './ParagraphDraggableElement';

const Clauses = styled.div`
padding: 8px;
width: 50vw;
`;
const Container = styled.div`
border : 1px solid black;
padding: 8px; 
borderRadius: 2px;
margin-Bottom: 8px;
display: flex;
flex-wrap: nowrap;
background-Color: rgb(240,240,240);
`;
const Truth = styled.div`
padding: 8px;
width: 45vw;
`;
export class ParagraphDroppableRowElement extends React.Component {

    constructor(props) {
        super(props);

    }


    render(){
        return(
            <Container>
                <Truth>
                    <b>{this.props.trueParagraph.title}</b> <br/>
                    <i>Klasse: {this.props.index}</i>
                </Truth>
                <div >
                    <Droppable droppableId={String(this.props.trueParagraph.trueState)}>
                        {(provided, snapshot) => (
                            <Clauses
                                innerRef={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'gainsboro' : '' }}
                                {...provided.droppableProps}>
                                {this.props.class.length === 0 ? <div>Keine</div> :
                                    (this.props.class).map((paragraph, i) => <ParagraphDraggableElement key={paragraph.id}
                                                                                               paragraph={paragraph}
                                                                                               index={i}/>)
                                    }
                                {provided.placeholder}
                            </Clauses>
                        )}
                    </Droppable>
                </div>
            </Container>

        )
    }
}
