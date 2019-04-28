"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button, ListItem } from 'react-md';

import { AGBListRow } from './AGBListRow';


export const AGBList = ({data}) => (
        <DataTable plain >
            <TableHeader>
                <TableRow>
                    <TableColumn>ID</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Paragraphs Labeled</TableColumn>
                    <TableColumn>Clauses Labeled</TableColumn>
                    <TableColumn>Go to Classification</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((agb, i) => <AGBListRow key={i} agb={agb}  />)}
            </TableBody>
        </DataTable>
);
