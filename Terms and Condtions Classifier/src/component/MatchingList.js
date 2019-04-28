"use strict";

import React from 'react';
import { DroppableRowElement } from './DroppableRowElement';
import { ParagraphDroppableRowElement } from './ParagraphDroppableRowElement';


export class MatchingList extends React.Component {

    constructor(props) {
        super(props);
    }


    render(){
        return(
            <div key={this.props.key} style={{marginBottom : "15px", marginTop: "70px"}}>
                {this.props.type === "paragraph" ? (this.props.truth).map((trueParagraph, i) => <ParagraphDroppableRowElement key={i}
                                                                                                                              trueParagraph={trueParagraph}
                                                                                                                             class={this.props.classes[i]}
                                                                                                                             index={i}
                                                                                                                             agbid={this.props.agbid}/>)
                                                : (this.props.truth).map((trueClause, i) => <DroppableRowElement key={i}
                                                                                                                            trueClause={trueClause}
                                                                                                                            class={this.props.classes[i]}
                                                                                                                            index={i}
                                                                                                                            agbid={this.props.agbid}/>)}
            </div>
        )
    }
}


