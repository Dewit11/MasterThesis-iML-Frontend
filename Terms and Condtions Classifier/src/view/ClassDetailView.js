"use strict";

import React from 'react';
import Page from "../component/Page";
import {ClassList} from "../component/ClassList";


export class ClassDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            paraOrClause: 'clause'
        };
    }
    componentWillMount(){
        let id = this.props.match.params.classId;
        let pOc = this.props.match.params.paraClause;
        console.log("P or C", this.state.paraOrClause)
        this.setState({paraOrClause: pOc})
        console.log("Class ID", id)
        console.log("P or C", this.state.paraOrClause)
        this.getClasses(id, pOc)
    }

    getClasses(id, pOc){
        fetch('http://localhost:5000/dataFromClass/' + pOc + '/' + id, {
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
        console.log(this.state.data)
        return(
            <Page>
                <div style={{marginBottom : "35px", marginTop: "70px"}}>
                    <ClassList data={this.state.data} flag={this.state.paraOrClause}/>
                </div>
            </Page>
        );
    }
}
