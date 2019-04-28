"use strict";

import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

import { DraggableElement } from './DraggableElement';

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
export class DroppableRowElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            paragraphLoaded: false
        };
        this.getParagraphs = this.getParagraphs.bind(this)
    }

    componentDidMount(){
        let agbid = this.props.agbid;
        let classid = this.props.trueClause.trueState;
        this.getParagraphs(this.props.trueClause.id)
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
            <Container>
                <Truth>
                    {this.state.paragraphLoaded === false ? <b>Paragraph</b> :
                        <b>{this.state.data.title} --- Klasse: {this.state.data.trueState}</b>}<br/>
                    {this.props.trueClause.rawText} <br/><br/>
                    <i>Klasse: {this.props.index}</i>
                </Truth>
                <div >
                    <Droppable droppableId={String(this.props.trueClause.trueState)}>
                        {(provided, snapshot) => (
                            <Clauses
                                innerRef={provided.innerRef}
                                style={{ backgroundColor: snapshot.isDraggingOver ? 'gainsboro' : '' }}
                                {...provided.droppableProps}>
                                {this.props.class.length === 0 ? <div>Keine</div> :
                                    (this.props.class).map((clause, i) => <DraggableElement key={clause.id}
                                                                                              clause={clause}
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
