import { useState, useEffect} from 'react';
import { OcmResource } from '../../../src/data/loader'
import {  Gallery, Title } from '@patternfly/react-core';
import { DateFormat } from '../common/common';
import GalleryTableComponent from '../common/ConditionTable';
 

export default function ShowManagedClusters(){
    let [managedClusters, setManagedClusters] = useState<OcmResource[]>([]);

	useEffect(() => {
        window.addEventListener("message", event => {
			if ('crsDistribution' in event.data && 'ManagedCluster' === event.data.crsDistribution.kind) {
				setManagedClusters(JSON.parse(event.data.crsDistribution.crs));
			}        
            });
        });
    return (
        <section className="component-row">
            { managedClusters.length > 0 &&
                <>
                <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>Managed Clusters</Title>         
                <Gallery className='ocm-gallery' hasGutter={true} >
                {managedClusters.map(managedCluster => {
                        const row = managedCluster.kr.status.conditions.map( (condition:any) => { 
                                return [new Date(condition.lastTransitionTime).toLocaleString("en-US",DateFormat),
                                        condition.message,
                                        condition.reason,
                                        condition.status
                                    ]      
                                })                            
                return  <GalleryTableComponent  
                                title={`Cluster Name: ${managedCluster.kr.metadata.name}`}
                                subtitle={`Kube Version: ${managedCluster.kr.status.version.kubernetes}`}
                                rows={row}
                            />                      
                            }
                        )}   
            </Gallery>
            </>
            }
        </section>
    );
}
