import { OcmResource } from '../../../src/data/loader'
import { Gallery,GalleryItem,Card,CardHeader, Title,CardBody } from '@patternfly/react-core';
import Graph from '../common/Graph';
import { kubeImage } from '../common/common';
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
// import { Table, TableBody, TableHeader } from '@patternfly/react-table';


type SubscriptionReportsProps = {
    subscriptionReports: OcmResource[],
    kubeImages: kubeImage[]
}

type StatusMap  = {      
    clusters: string , 
    deployed: string,  
    failed: string ,
    inProgress: string ,
    propagationFailed: string 
    [key: string]: string;

}

const SubscriptionReportsSummeryColumns: StatusMap  = {      
    clusters: "Clusters" , 
    deployed: "Deployed",  
    failed: "Failed" ,
    inProgress: "In Progress" ,
    propagationFailed: "Propagation Failed" 
}

export default function ShowSubscriptionReports(Props: SubscriptionReportsProps) {

    return (
        <section className="component-row">
            { Props.subscriptionReports.length >0 &&
                
                <>
                    <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>Subscription Report</Title>
                    <Gallery className='ocm-gallery' hasGutter={true} >

                    {Props.subscriptionReports.map( subscriptionReport => { 
                            console.log(`subscriptionReport`)
                            console.log(subscriptionReport)

                            let rows = {        clusters: 0,
                                                deployed:0,
                                                failed: 0,
                                                inProgress: 0,
                                                propagationFailed: 0
                                            }
                                            
                            

                            if (subscriptionReport.kr.summary && subscriptionReport.kr.summary.clusters > -1 ) {
                                rows = {        clusters: subscriptionReport.kr.summary.clusters,
                                                deployed:subscriptionReport.kr.summary.deployed,
                                                failed: subscriptionReport.kr.summary.failed,
                                                inProgress: subscriptionReport.kr.summary.inProgress,
                                                propagationFailed: subscriptionReport.kr.summary.propagationFailed
                                            }
                                        
                            const tableHeader =  Object.entries(SubscriptionReportsSummeryColumns).map(([key, value]) =>  <Th>{value}</Th>)

                            return <GalleryItem>
                                    <Card>
                                        <CardHeader>   
                                        <Title headingLevel='h3' size='md'>Subscription Name: {subscriptionReport.kr.metadata.name}</Title> 
                                        <Title headingLevel='h3' size='md'>Namespace: {subscriptionReport.kr.metadata.namespace?subscriptionReport.kr.metadata.namespace:'missing namespace'}</Title>                   
                                        </CardHeader>
                                        <CardBody>
                                            
                                        <p> Report Type:  {subscriptionReport.kr.reportType}</p>
                                            {/*TODO add placement name and chanel */}
                                            <Graph data={{  name: subscriptionReport.kr.metadata.name,
                                                            namespace: subscriptionReport.kr.metadata.namespace?subscriptionReport.kr.metadata.namespace:'missing namespace',
                                                            children:  subscriptionReport.kr.resources?subscriptionReport.kr.resources:[]
                                            } } images={Props.kubeImages}/>
                                            <div style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10 }}></div>

                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        {tableHeader}
                                                    </Tr>
                                                </Thead>
                                                <Tbody className="managed-clusters-table">
                                                    <Tr>
                                                    {Object.entries(rows).map( ([key, value]) => (<Td dataLabel={SubscriptionReportsSummeryColumns[key.toString()]}>{value}</Td>))}
                                                    </Tr>
                                                </Tbody>
                                            </Table>

                                        </CardBody>
                                    </Card>
                                    </GalleryItem>   
                        } })}
                    </Gallery>

                </>
            }
        </section>
    );
}
