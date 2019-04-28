"use strict";

import React from 'react';

import Page from "../component/Page";
import {BarChart} from 'react-easy-chart';

export class DataView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dataClauses: [],
            dataParagraphs:[],
            dataUniqueClauses:[],
            dataUniqueParagraphs:[]
        };
        this.mouseOverHandler1 = this.mouseOverHandler1.bind(this);
        this.mouseOverHandler2 = this.mouseOverHandler2.bind(this);
        this.mouseOverHandler3 = this.mouseOverHandler3.bind(this);
        this.mouseOverHandler4 = this.mouseOverHandler4.bind(this);
        this.mouseOutHandler = this.mouseOutHandler.bind(this);
    }
    componentWillMount(){
        this.getData("clauses")
        this.getData("uniqueClauses")
        this.getData("paragraphs")
        this.getData("uniqueParagraphs")

    }

    getData(whatData){
        fetch("http://localhost:5000/data/" + whatData, {
            method : 'GET',
            header : 'Access-Control-Allow-Origin'
        }).then(res => res.json()
        ).then(response => {
            switch (whatData){
                case "clauses":
                    this.setState({dataClauses: [...response]});
                    break;
                case "uniqueClauses":
                    this.setState({dataUniqueClauses: [...response]});
                    break;
                case "paragraphs":
                    this.setState({dataParagraphs: [...response]});
                    break;
                case"uniqueParagraphs":
                    this.setState({dataUniqueParagraphs: [...response]});
            }
        });
    }

    mouseOverHandler1(d, e) {
        this.setState({
            showToolTip1: true,
            y: d.y,
            x: d.x});
    }
    mouseOverHandler2(d, e) {
        this.setState({
            showToolTip2: true,
            y: d.y,
            x: d.x});
    }
    mouseOverHandler3(d, e) {
        console.log("mouse 3")
        this.setState({
            showToolTip3: true,
            y: d.y,
            x: d.x});
    }
    mouseOverHandler4(d, e) {
        console.log("mouse 4")
        this.setState({
            showToolTip4: true,
            y: d.y,
            x: d.x});
    }
    mouseOutHandler() {
        this.setState({
            showToolTip1: false,
            showToolTip2: false,
            showToolTip3: false,
            showToolTip4: false

        });
    }

    createTooltip1() {
        if (this.state.showToolTip1) {
            return (
                <div style={{position: "absolute ", left: "80px", top: "50px" }}>
                    <b>Class {this.state.x} has {this.state.y} entries</b>
                </div>
            );
        }
        return false;
    }
    createTooltip2() {
        if (this.state.showToolTip2) {
            return (
                <div style={{position: "absolute ", left: "80px", top: "50px" }}>
                    <b>Class {this.state.x} has {this.state.y} entries</b>
                </div>
            );
        }
        return false;
    }
    createTooltip3() {
        if (this.state.showToolTip3) {
            return (
                <div style={{position: "absolute ", left: "80px", top: "50px" }}>
                    <b>Class {this.state.x} has {this.state.y} entries</b>
                </div>
            );
        }
        return false;
    }
    createTooltip4() {
        if (this.state.showToolTip4) {
            return (
                <div style={{position: "absolute ", left: "80px", top: "50px" }}>
                    <b>Class {this.state.x} has {this.state.y} entries</b>
                </div>
            );
        }
        return false;
    }
    render(){
        return(
            <Page>
                <div style={{marginBottom : "35px", marginTop: "70px"}}>
                    <div style={{padding: "8px", position: "relative"}}>
                        <BarChart
                            style={{ '.label': { fill: 'black' } }}
                            axes
                            axisLabels={{x: 'Class ID', y: '# Clauses / Class'}}
                            grid
                            height={350}
                            width={900}
                            data={this.state.dataClauses}
                            mouseOverHandler={this.mouseOverHandler1}
                            mouseOutHandler={this.mouseOutHandler}
                            clickHandler={(d) => this.props.history.push('/class/clause/' + d.x)}
                        />
                        {this.createTooltip1()}
                    </div>
                    <div style={{padding: "8px", position: "relative"}}>
                        <BarChart
                            style={{ '.label': { fill: 'black' } }}
                            axes
                            axisLabels={{x: 'Class ID', y: '# AGBs with Clauses / Class'}}
                            grid
                            height={350}
                            width={900}
                            data={this.state.dataUniqueClauses}
                            mouseOverHandler={this.mouseOverHandler2}
                            mouseOutHandler={this.mouseOutHandler}
                            clickHandler={(d) => this.props.history.push('/class/clause/' + d.x)}
                        />
                        {this.createTooltip2()}
                    </div>
                    <div style={{padding: "8px", position: "relative"}}>
                        <BarChart
                            style={{ '.label': { fill: 'black' } }}
                            axes
                            axisLabels={{x: 'Class ID', y: '# Paragraphs / Class'}}
                            grid
                            height={350}
                            barWidth={20}
                            data={this.state.dataParagraphs}
                            mouseOverHandler={this.mouseOverHandler3}
                            mouseOutHandler={this.mouseOutHandler}
                            clickHandler={(d) => this.props.history.push('/class/paragraph/' + d.x)}
                        />
                        {this.createTooltip3()}
                    </div>
                    <div style={{padding: "8px", position: "relative"}}>
                        <BarChart
                            style={{ '.label': { fill: 'black' } }}
                            axes
                            axisLabels={{x: 'Class ID', y: '# AGBs with Paragraphs / Class'}}
                            grid
                            height={350}
                            barWidth={20}
                            data={this.state.dataUniqueParagraphs}
                            mouseOverHandler={this.mouseOverHandler4}
                            mouseOutHandler={this.mouseOutHandler}
                            clickHandler={(d) => this.props.history.push('/class/paragraph/' + d.x)}

                        />
                        {this.createTooltip4()}
                    </div>
                </div>
            </Page>
        );
    }
}