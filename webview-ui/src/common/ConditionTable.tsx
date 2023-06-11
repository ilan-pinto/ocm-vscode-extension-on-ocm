import React from 'react';
import { GalleryItem, Card, CardHeader, Title, CardBody } from '@patternfly/react-core';
import { Table, TableHeader, TableBody, IRow, ICell, ISortBy } from '@patternfly/react-table';


type GalleryComponentProps = {
    title: string;
    subtitle?: string;
    rows: (IRow | string[])[]
    cells?: (ICell | string)[] 
    sort?: ISortBy;
  };

  const DefaultConditionColumns: Object[] = [     
    {title:"Last Transition Time" , }, 
    {title: "Message" ,  },
    {title: "Reason" },
    {title:"Status"   }
]

const GalleryTableComponent: React.FC<GalleryComponentProps> = ({ title, subtitle='', rows , cells = DefaultConditionColumns , sort = {index: 1, direction:"asc"} }) => {

   
            return (
                <GalleryItem>
                <Card>
                    <CardHeader>
                    <Title headingLevel="h2" size="md">{title}</Title>
                    <br/>
                    <Title headingLevel="h2" size="md">{subtitle}</Title>                     
                    </CardHeader>
                    <CardBody>
                    <Table gridBreakPoint="grid-md" rows={rows} cells={cells} sortBy={sort}>
                        <TableHeader />
                        <TableBody className="managed-clusters-table" />
                    </Table>
                    </CardBody>
                </Card>
                </GalleryItem>
            );
            };

 export const ConditionTableComponent: React.FC<GalleryComponentProps> = ({ title, subtitle='', rows, cells = DefaultConditionColumns , sort = {index: 1, direction:"asc"} }) => {
    return (
        <>
        <Title headingLevel="h2" size="md" style={{ marginTop: '40px' }}>{title}</Title>
        <Title headingLevel="h2" size="md">{subtitle}</Title>
        <Table gridBreakPoint= 'grid-md'  rows={rows} cells={cells} sortBy={sort} >
        <TableHeader/>
        <TableBody />   
        </Table>
        </>
    );
                };

export default GalleryTableComponent;