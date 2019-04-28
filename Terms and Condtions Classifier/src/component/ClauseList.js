"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, ListItem } from 'react-md';

import {ClauseListRow} from "./ClauseListRow";


export const ClauseList = ({data}) => (
    <DataTable plain >
        <TableHeader>
            <TableRow>
                <TableColumn>ID</TableColumn>
                <TableColumn>Text</TableColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((clause, i) => <ClauseListRow key={i} clause={clause} index={i} />)}
        </TableBody>
    </DataTable>
);
