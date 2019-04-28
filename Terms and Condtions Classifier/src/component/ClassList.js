"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, ListItem } from 'react-md';

import { ClassListRow } from './ClassListRow';


export const ClassList = ({data, flag}) => (
    <DataTable plain >
        <TableHeader>
            <TableRow>
                <TableColumn>ID</TableColumn>
                <TableColumn>Text</TableColumn>
                <TableColumn>AGB ID</TableColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((clause, i) => <ClassListRow key={i} clause={clause} index={i} flag={flag}/>)}
        </TableBody>
    </DataTable>
);

