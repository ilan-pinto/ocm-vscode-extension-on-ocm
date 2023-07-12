import { useState, useEffect } from 'react';
import { OcmResource } from '../../../src/data/loader'
import { Gallery, Title } from '@patternfly/react-core';
import {  DateFormat } from '../common/common';
import GalleryTableComponent from '../common/ConditionTable';

type managedClusterSetsProps = {
    managedClusterSets: OcmResource[]
}


export default function ShowManagedClusterSets(Props: managedClusterSetsProps) {




    return (
        <section className="component-row">
            { Props.managedClusterSets.length > 0 &&
                <>
                    <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>Managed Cluster Sets</Title>
                    <Gallery className='ocm-gallery' hasGutter={true} >

                    {Props.managedClusterSets.map(managedClusterSet => {
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
                                    id={`${managedClusterSet.kr.metadata.name}`}
                                />  
                        } 
                    )}
                    </Gallery>    
                    </>
            }
        </section>
    );
}
