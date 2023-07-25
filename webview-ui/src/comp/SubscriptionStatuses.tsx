import { OcmResource } from '../../../src/data/loader'
import { Gallery, Title } from '@patternfly/react-core';
import GalleryTableComponent from '../common/ConditionTable';

type SubscriptionStatusesProps ={
    subscriptionStatuses: OcmResource[],
    subscription: OcmResource[],
} 

const SubscriptionStatusesColumns: Object[] = [     
    {title: "kind" ,}, 
    {title: "LastUpdateTime",  },
    {title: "Name" },
    {title: "Namespace" },
    {title: "PropagationFailed" }
]

export default function ShowSubscriptionStatuses(Props: SubscriptionStatusesProps) {

    return (
        <section className="component-row">
            { Props.subscriptionStatuses.length >0 &&            
                <>
                    <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>Subscription Status</Title>
                    <Gallery className='ocm-gallery' hasGutter={true} >
                    {Props.subscriptionStatuses.map(subscriptionStatus => {
                    console.log(`subscriptionStatus`)
                    console.log(subscriptionStatus)
                    return <GalleryTableComponent
                        title={`Subscription Name: ${subscriptionStatus.name}`}
                        rows={subscriptionStatus.kr.statuses.packages.map( ( pkg:any )=> {return [  pkg.kind,
                                                                                                    pkg.lastUpdateTime,
                                                                                                    pkg.name,
                                                                                                    pkg.namespace,
                                                                                                    pkg.phase
                                                                                                ]} 
                        ) }
                        cells={SubscriptionStatusesColumns}
                        id={`${subscriptionStatus.kr.metadata.name}`}
                    > 
                    <p> Namespace: {subscriptionStatus.namespace} </p>
                    </GalleryTableComponent>
                    }
                )}
                    <div style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10 }}></div>
                    </Gallery>
                </>
            }
        </section>
    );
}
