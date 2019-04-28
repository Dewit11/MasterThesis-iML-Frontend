"use strict";

import React from 'react';

import { Link } from 'react-router-dom';

import Page from "../component/Page";
import { Button } from 'react-md';
import { AGBList } from '../component/AGBList';

export class AGBListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }
    componentWillMount(){
        this.getAgbs()
    }

    getAgbs(){
        fetch("http://localhost:5000/agb" , {
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
                    <AGBList data={this.state.data}/>
                </div>
            </Page>
        );
    }
}