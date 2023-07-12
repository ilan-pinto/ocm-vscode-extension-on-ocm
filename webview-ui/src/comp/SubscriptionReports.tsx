import { OcmResource } from '../../../src/data/loader'
import { Gallery,GalleryItem,Card,CardHeader, Title,CardBody } from '@patternfly/react-core';
import Graph from '../common/Graph';
import { kubeImage } from '../common/common';
import { useEffect } from 'react';


type SubscriptionReportsProps = {
    subscriptionReports: OcmResource[],
    kubeImages: kubeImage[]
}


export default function ShowSubscriptionReports(Props: SubscriptionReportsProps) {
    useEffect(() => {
    },[Props,Props.subscriptionReports,Props.kubeImages])

    return (
        <section className="component-row">
            { Props.subscriptionReports.length >0 &&
                
                <>
                    <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>Subscription Report</Title>
                    <Gallery className='ocm-gallery' hasGutter={true} >

                    {Props.subscriptionReports.map( subscriptionReport => { 
                            console.log(`subscriptionReport.kr.resources`)
                            console.log(subscriptionReport.kr.resources)  
                            return <GalleryItem>
                                    <Card>
                                        <CardHeader>   
                                        <Title headingLevel='h3' size='md'>{subscriptionReport.kr.metadata.name}</Title>                  
                                        </CardHeader>
                                        <CardBody>
                                                <Graph data={{  name: subscriptionReport.kr.metadata.name,
                                                                namespace: subscriptionReport.kr.metadata.namespace?subscriptionReport.kr.metadata.namespace:'missing namespace',
                                                                children:  subscriptionReport.kr.resources
                                                } } images={Props.kubeImages}/>
                                        </CardBody>
                                        </Card>
                                    </GalleryItem>   
                                    })}
                    </Gallery>

                    <div style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10 }}></div>
                </>
            }
        </section>
    );
}
