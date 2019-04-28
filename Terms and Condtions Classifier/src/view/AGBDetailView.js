"use strict";

import React from 'react';
import Page from "../component/Page";
import {ParagraphList} from "../component/ParagraphList";


export class AGBDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentWillMount(){
        let id = this.props.match.params.id;
        this.getAgbs(id)
    }

    getAgbs(id){
        fetch('http://localhost:5000/paragraphsFromAGB/' + id, {
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
     return(
            <Page>
                <div style={{marginBottom : "35px", marginTop: "70px"}}>
                    {(this.state.data).map((paragraph, i) => <ParagraphList key={i} paragraph={paragraph} index={i}/>)}
                </div>
            </Page>
        );
    }
}