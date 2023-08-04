import { useState, useEffect, useRef} from 'react';
import { OcmResource } from '../../../src/data/loader'
import { kubeImage } from '../common/common';
import { Spinner } from '@patternfly/react-core';
import ShowSubscriptionStatuses from '../comp/SubscriptionStatuses';
import ShowAppliedManifestWorks from '../comp/AppliedManifestWorks';
import ShowKlusterlet from '../comp/Klusterlet';

export default function ManagedClusterPage(){
    let [kubeImages, setKubeImages] = useState<kubeImage[]>([]);
    let dataRequests = useRef(0);
    let klusterletRef = useRef<OcmResource[]>([]);
    let appliedManifestWorkRef = useRef<OcmResource[]>([]);
    let managedClusterSetsRef = useRef<OcmResource[]>([]);
    let subscriptionStatusRef = useRef<OcmResource[]>([]);
    let subscriptionRef = useRef<OcmResource[]>([]);
    let kubeImagesRef = useRef<kubeImage[]>([]);

    useEffect(() => {
        dataRequests.current += 1

        window.addEventListener("message", event => { 
            if ('crsDistribution' in event.data.msg) { 
                dataRequests.current += 1
                let crsData =   JSON.parse(event.data.msg.crsDistribution.crs)     
                switch (event.data.msg.crsDistribution.kind) { 
                    case 'Klusterlet' :
                        klusterletRef.current = crsData;
                        break;
                    case 'AppliedManifestWork':
                        if (appliedManifestWorkRef.current.length !== crsData.length) {
                            appliedManifestWorkRef.current = crsData;
                        }
                        break;
                    case 'ManagedClusterSet':
                        if (managedClusterSetsRef.current.length !== crsData.length) {
                            managedClusterSetsRef.current = crsData ;
                        }
                        break;
                    case 'SubscriptionStatus':
                        if (subscriptionStatusRef.current.length !== crsData.length) {
                            subscriptionStatusRef.current = crsData ;
                        }
                        break;
                    case 'Subscription':
                        if (subscriptionRef.current.length !== crsData.length) {
                            subscriptionRef.current = crsData ;
                        }
                        break;            
                }
                if (event.data.images) { 
                    if (event.data.images) {
                    //TODO move this logic to Graph 
                    kubeImagesRef.current = event.data.images
                    //setting the image state re-renders the component 
                    setKubeImages(kubeImagesRef.current)                                
                    }   
                }
            }
		});
    },[kubeImages]);

    if(dataRequests.current > 5 ){    
            return (<> 
            	<ShowKlusterlet klusterlet={klusterletRef.current} />
				<ShowAppliedManifestWorks appliedManifestWorks={appliedManifestWorkRef.current} kubeImages={kubeImagesRef.current} />
				<ShowSubscriptionStatuses subscriptionStatuses={subscriptionStatusRef.current} subscription={subscriptionRef.current}/>
            </>
            )
        }


    else {
        return ( <Spinner size='xl'/>       
        )
    }
    
}