import React, { useState } from 'react';
import { GalleryItem, Card, CardHeader, Title, CardBody, CodeBlock, CodeBlockCode, Accordion, AccordionItem, AccordionToggle, AccordionContent } from '@patternfly/react-core';
import { Table,  IRow, ISortBy, Thead, Tr,Th ,Tbody, Td } from '@patternfly/react-table'; //TableHeader, TableBody,


type GalleryComponentProps = {
    id: string
    title: string;
    subtitle?: string;
    rows: (IRow | string[])[]
    cells?: Object
    code?: string; 
    sort?: ISortBy;
    children?: React.ReactNode; 
    
};


const defaultColumnNames = {
    time: 'Last Transition Time',
    message: 'Message',
    reason: 'Reason',
    status: 'Status',
   
  };

const GalleryTableComponent: React.FC<GalleryComponentProps> = ({id, title, subtitle='', rows , cells = defaultColumnNames , sort = {index: 1, direction:"asc"}, code, children }) => {
            const [expanded, setExpanded] =  useState('');  
            
            const onToggle = (id: string) => {
                        if (id === expanded) {
                        setExpanded('');
                        } else {
                        setExpanded(id);
                        }
                    };
            return (
                <GalleryItem>
                <Card>
                    <CardHeader>
                        <Title headingLevel="h2" size="md">{title}</Title>
                        <br/>
                        <Title headingLevel="h2" size="md">{subtitle}</Title> 
                                        
                    </CardHeader>
                    <CardBody>
                    {children}   
                    {code ? <CodeBlock> 
                                <CodeBlockCode>{code}</CodeBlockCode>
                            </CodeBlock> 
                            : null 
                    }
                                <Accordion> 
                                    <AccordionItem>
                                        <AccordionToggle  onClick={() => {
                                                                            onToggle(`cond-table-${id}`);
                                                                        }}
                                                                        isExpanded={expanded === `cond-table-${id}`}
                                                                        id={`cond-table-${id}`}>
                                            Condition table 
                                        </AccordionToggle>
                                        <AccordionContent id={`cond-${id}`} isHidden={expanded !== `cond-table-${id}`}>
                                            <Table>
                                                        <Thead>
                                                            <Tr>
                                                                <Th>{defaultColumnNames.time}</Th>
                                                                <Th>{defaultColumnNames.reason}</Th>
                                                                <Th>{defaultColumnNames.status}</Th>
                                                                <Th>{defaultColumnNames.message}</Th>
                                                            </Tr>
                                                            </Thead>
                                                <Tbody className="managed-clusters-table"> 
                                                {rows.map( (row:any) => {
                                                    return <Tr>
                                                            <Td dataLabel={defaultColumnNames.time}>{row.time}</Td>
                                                            <Td dataLabel={defaultColumnNames.reason}>{row.reason}</Td>
                                                            <Td dataLabel={defaultColumnNames.status}>{row.status}</Td>
                                                            <Td dataLabel={defaultColumnNames.message}>{row.message}</Td>
                                                        </Tr>
                                                    }
                                                )}
                                                </Tbody>
                                            </Table>
                        </AccordionContent>   
                    </AccordionItem>
                    </Accordion> 
                                    
                    </CardBody>
                </Card>
                </GalleryItem>
            );
            };

export const ConditionTableComponent: React.FC<GalleryComponentProps> = ({ id='', title, subtitle='', rows, cells = defaultColumnNames , sort = {index: 1, direction:"asc"} }) => {
    return (
        <>
        <Title headingLevel="h2" size="md" style={{ marginTop: '40px' }}>{title}</Title>
        <Title headingLevel="h2" size="md">{subtitle}</Title>
        <Table>
                <Thead>
                    <Tr>
                        <Th>{defaultColumnNames.time}</Th>
                        <Th>{defaultColumnNames.reason}</Th>
                        <Th>{defaultColumnNames.status}</Th>
                        <Th>{defaultColumnNames.message}</Th>
                    </Tr>
                    </Thead>
        <Tbody className="managed-clusters-table"> 
        {rows.map( (row:any) => { 
         
            return  <Tr>
            <Td dataLabel={defaultColumnNames.time}>{row.time}</Td>
            <Td dataLabel={defaultColumnNames.reason}>{row.reason}</Td>
            <Td dataLabel={defaultColumnNames.status}>{row.status}</Td>
            <Td dataLabel={defaultColumnNames.message}>{row.message}</Td>
            </Tr>
})}
        </Tbody>
        </Table>
        </>
    );
};

export default GalleryTableComponent;