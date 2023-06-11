import { useState, useEffect } from 'react';
import { OcmResource } from '../../../src/data/loader'
import { PageSection} from '@patternfly/react-core';
import { DateFormat } from '../common/common';
import { ConditionTableComponent } from '../common/ConditionTable';
 

export default function ShowClusterManagers() {
    let [clusterManagers, setClusterManagers] = useState<OcmResource[]>([]);

	useEffect(() => {
        window.addEventListener("message", event => {
			if ('crsDistribution' in event.data && 'ClusterManager' === event.data.crsDistribution.kind) {
				setClusterManagers(JSON.parse(event.data.crsDistribution.crs));
			}
		});
    });



    const row = clusterManagers.map(clusterManager => {            
        return clusterManager.kr.status.conditions.map( (condition:any) => { 
            return [new Date(condition.lastTransitionTime).toLocaleString("en-US",DateFormat),
                    condition.message,
                    condition.reason,
                    condition.status
                ]      
            })
        })
            

    return (
        
        <PageSection>
        <section className="component-row">
            { clusterManagers.length > 0 &&
                <>
                <ConditionTableComponent title={"Cluster Manager"} rows={row[0]}   />
                <div style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10 }}></div>
                </>
            }
        </section>
        </PageSection>
    );
}
