"use strict";

import React from 'react';

import { Button, TabsContainer, Tabs, Tab } from 'react-md';


import { ClauseList } from '../component/ClauseList';

export class CompanyFormView extends React.Component {

    constructor(props){
        super (props);
        this.state = {
            clicked: false,
            isSet : false,
            data: [],
            companyName : '',
            fullText : '',
            splitText:[]
        }
        this.splitText = this.splitText.bind(this)
        this.addAGB = this.addAGB.bind(this)
        this.handleCompanyName = this.handleCompanyName.bind(this);
        this.handleFullText = this.handleFullText.bind(this);
    }


    addAGB(){
        fetch("http://localhost:5000/newAGB" , {
            method : 'POST',
            headers : {"Content-Type": "application/json; charset=utf-8"},
            body : JSON.stringify({
                'name' : this.state.companyName,
                'splitText' : this.state.splitText
            })
        }).then(res => res.json()
        ).then(response => {
            this.setState({
                data: response
            });
        });

    }
    splitText(){
        var regex = /\n{1,}/g;
        var gesplitet = this.state.fullText
            .split(regex)
        this.setState({splitText : gesplitet});
        console.log(gesplitet)
    }
    handleCompanyName(event) {
        this.setState({companyName : event.target.value});
    }
    handleFullText(event) {
        this.setState({fullText : event.target.value});
        this.splitText();
    }
    render(){

        return(
            <TabsContainer
                panelClassName="md-grid"
                colored
                fixed>
                <Tabs tabId="simple-tab">
                    <Tab label="Text Input">
                    <div style={{marginBottom : "5px", marginTop : "10px"}}>
                        <Button style={{marginLeft:"750px"}} icon>help_outline</Button>
                        <input type="text"
                               placeholder="Company Title"
                               required
                               value={this.state.companyName}
                               onChange={this.handleCompanyName} />
                        <textarea placeholder="Input Terms and Conditions here"
                                  value={this.state.fullText}
                                  onChange={this.handleFullText}
                                  style={{resize: "none", height : "75vh", width: "80vw"}}/>
                        <Button onClick={() => this.addAGB()} raised>Neue AGB hinzufügen</Button>
                    </div>
                        <Button href={"/#/"} floating icon>home</Button>
                    </Tab>
                    <Tab label="Check Format">
                        <ClauseList data={this.state.splitText}/>
                    </Tab>
                </Tabs>
            </TabsContainer>
        );
    }
}
