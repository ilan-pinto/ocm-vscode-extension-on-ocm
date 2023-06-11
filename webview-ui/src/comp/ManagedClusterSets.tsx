import { useState, useEffect } from 'react';
import { OcmResource } from '../../../src/data/loader'
import { Card, CardBody, CardHeader, Gallery, GalleryItem, Title } from '@patternfly/react-core';
import {  DateFormat } from '../common/common';
import { Table, TableBody, TableHeader } from '@patternfly/react-table';
import GalleryTableComponent from '../common/ConditionTable';

export default function ShowManagedClusterSets() {
    let [managedClusterSets, setManagedClusterSets] = useState<OcmResource[]>([]);

	useEffect(() => {
        window.addEventListener("message", event => {
			if ('crsDistribution' in event.data && 'ManagedClusterSet' === event.data.crsDistribution.kind) {
				setManagedClusterSets(JSON.parse(event.data.crsDistribution.crs));
			}
        });
    });



    return (
        <section className="component-row">
            { managedClusterSets.length > 0 &&
                <>
                    <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>Managed Cluster Sets</Title>
                    <Gallery className='ocm-gallery' hasGutter={true} >

                    {managedClusterSets.map(managedClusterSet => {
                        const row = managedClusterSet.kr.status.conditions.map( (condition:any) => { 
                            return [new Date(condition.lastTransitionTime).toLocaleString("en-US",DateFormat),
                                    condition.message,
                                    condition.reason,
                                    condition.status
                                ]      
                            })
                        return  <GalleryTableComponent  
                                    title={`ClusterSet Name: ${managedClusterSet.kr.metadata.name}`}
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
