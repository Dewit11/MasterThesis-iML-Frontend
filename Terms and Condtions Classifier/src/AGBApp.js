"use strict";

import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { CompanyFormView } from './view/CompanyFormView';
import { AGBListView }   from './view/AGBListView';
import { AGBDetailView }   from './view/AGBDetailView';
import { ClauseMatchingView }   from './view/ClauseMatchingView';
import { ParagraphMatchingView } from './view/ParagraphMatchingView';
import { ClassDetailView } from './view/ClassDetailView';
import { DataView } from './view/DataView';



export default class AGBApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'AGB Analyse Tool',
            routes: [
                { component: AGBListView , path: '/', exact: true},
                { component: CompanyFormView , path: '/newCompany'},
                { component: AGBDetailView, path: '/detailView/:id'},
                { component: ClauseMatchingView, path: '/match/clauses/:id/:methodId'},
                { component: ParagraphMatchingView, path: '/match/paragraphs/:id/:methodId'},
                { component: ClassDetailView, path: '/class/:paraClause/:classId'},
                { component: DataView, path: '/data'}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}
