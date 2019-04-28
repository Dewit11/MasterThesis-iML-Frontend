"use strict";

import React from 'react';

import Page from "../component/Page";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from 'react-md';

import { MatchingList } from '../component/MatchingList';

export class ParagraphMatchingView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            truth: [],
            data: [],
            classes:[],
            predictions:[],
            classesLoaded: false,
            truthLoaded: false
        };

        this.onDragEnd = this.onDragEnd.bind(this)
        this.sortClasses = this.sortClasses.bind(this)
        this.getPredictions = this.getPredictions.bind(this)
        this.setTrueState = this.setTrueState.bind(this)

    }
    onDragEnd (result) {
        const {destination, source, draggableId } = result;
        if(!destination){
            console.log("Kein legales Ziel");
            console.log("Drag ID:", draggableId);
            console.log("Drag index:", source.index);
            return;
        }
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log("Geiche Position");
            return;
        } else if (destination.droppableId === source.droppableId &&
            destination.index !== source.index
        ) {
            const classesClone = this.state.classes;
            const sourceClone = this.state.classes[source.droppableId];
            const [removedObject] = sourceClone.splice(source.index, 1);

            sourceClone.splice(destination.index, 0, removedObject);
            classesClone[source.droppableId] = sourceClone;
            console.log("Neuer Index im gleichen Feld");
            console.log("Klassen Clone:", classesClone);

            this.setState({
                classes: classesClone
            });
            return;
        } else if(destination.droppableId !== source.droppableId){
            const classesClone = this.state.classes;
            const sourceClone = this.state.classes[source.droppableId];
            const destinationClone = this.state.classes[destination.droppableId];
            const [removedObject] = sourceClone.splice(source.index, 1);

            destinationClone.splice(destination.index, 0, removedObject);
            classesClone[source.droppableId] = sourceClone;
            classesClone[destination.droppableId] = destinationClone;

            console.log("Neues Feld");
            console.log("Klassen Clone:", classesClone);

            this.setState({
                classes: classesClone
            });
            return;
        }
    };
    sortClasses(){
        for (var i = 0; i < this.state.truth.length; i++){
            const predictions = this.state.predictions.filter(prediction => prediction.predictedState === i);
            var result = [];
            var allEntries = [];
            var bothObjects = [];
            for (var j = 0; j < predictions.length; j++) {
                const related_clause = this.state.data.filter(clause => clause.id === predictions[j].paragraph);
                bothObjects = related_clause[0];
                allEntries.push(bothObjects)
            }
            result.push(allEntries);
            this.setState({
                classes: [...this.state.classes, ...result]
            });

        }
        this.setState({
            classesLoaded: true
        });

    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let method = this.props.match.params.methodId;
        this.setState({ agbid : id, methodid : method })
        this.getParagraphs(1)

    }
    getPredictions(agbid, methodid){
        console.log("In Predictions")

        fetch('http://localhost:5000/predictions/paragraph/'+ agbid + '/' + methodid, {
            method : 'GET',
            header : 'Access-Control-Allow-Origin'
        }).then(res => res.json()
        ).then(response => {
            this.setState({
                predictions: [...response]
            });
            this.sortClasses();
        });

    }
    getParagraphs(id){
        fetch('http://localhost:5000/paragraphsFromAGB/' + id, {
            method : 'GET',
            header : 'Access-Control-Allow-Origin'
        }).then(res => res.json()
        ).then(response => {
            if(this.state.truthLoaded == false){
                this.setState({
                    truth: [...response],
                    truthLoaded: true
                });
                this.getParagraphs(this.state.agbid)
            }else{
                this.setState({
                    data: [...response]
                });
                this.getPredictions(this.state.agbid, this.state.methodid);
            }

        });

    }
    setTrueState(){
        fetch("http://localhost:5000/setTrueState/paragraph", {
            method : 'PUT',
            headers : {"Content-Type": "application/json; charset=utf-8"},
            body : JSON.stringify({
                'classes' : this.state.classes,
                'agbid' : this.state.agbid
            })
        }).then(res => res.json()
        ).then(response => {
            this.props.history.push('/');
            return response

        });

    }
    render(){
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Page>
                    <div style={{marginBottom : "40px", marginTop: "70px"}}>
                        {this.state.classesLoaded === false ? <div>Loading...</div> :
                            <MatchingList truth={this.state.truth}
                                          classes={this.state.classes}
                                          agbid={this.state.agbid}
                                          type="paragraph"/>
                        }
                        <Button style={{marginLeft: "40vw", backgroundColor:"gainsboro"}}
                                onClick={() => this.setTrueState()}
                                raised>Klassifiziere diese AGB</Button>
                    </div>
                </Page>
            </DragDropContext>

        )
    }
}
