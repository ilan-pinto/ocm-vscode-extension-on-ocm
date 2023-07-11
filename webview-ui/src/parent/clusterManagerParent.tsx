import { useState, useEffect} from 'react';
import { OcmResource } from '../../../src/data/loader'
import {  Gallery, Title } from '@patternfly/react-core';
import { DateFormat, kubeImage } from '../common/common';
import GalleryTableComponent from '../common/ConditionTable';
import { OcmLabels } from '../common/Labels';
import ShowSelectedContext from '../comp/SelectedContext';
import ShowClusterManagers from '../comp/ClusterManagers';
import ShowManagedClusters from '../comp/ManagedClusters';
import ShowManifestWorks from '../comp/ManifestWorks';
import ShowSubscriptionReports from '../comp/SubscriptionReports';
import ShowPlacements from '../comp/Placements';
import ShowManagedClusterSets from '../comp/ManagedClusterSets';
import ShowManagedClusterAddons from '../comp/ManagedClusterAddons';
import { ConnectedContext } from '../../../src/data/builder';
 

export default function ClusterManagerPage(){
    let [clusterManagers, setClusterManagers] = useState<OcmResource[]>([]);
    let [managedClusters, setManagedClusters] = useState<OcmResource[]>([]);
    let [manifestWorks, setManifestWorks] = useState<OcmResource[]>([]);
    let [managedClusterSets, setManagedClusterSets] = useState<OcmResource[]>([]);
    let [placements, setPlacements] = useState<OcmResource[]>([]);
    let [kubeImages, setKubeImages] = useState<kubeImage[]>([]);
    let [selectedContext, setSelectedContext] = useState<ConnectedContext>();

    useEffect(() => {
        window.addEventListener("message", event => {
            if (event.data.images) { 
                //TODO move this logic to Graph 
                setKubeImages(event.data.images)
            }

            if ('selectedContext' in event.data.msg) {
				setSelectedContext(JSON.parse(event.data.msg.selectedContext));
			}

            if ('crsDistribution' in event.data.msg) { 
                switch (event.data.msg.crsDistribution.kind) {                
                    case 'ClusterManager':
                        setClusterManagers(JSON.parse(event.data.msg.crsDistribution.crs));
                        break;
                    case 'ManagedCluster':
                        setManagedClusters(JSON.parse(event.data.msg.crsDistribution.crs));
                        break;
                    case 'ManagedClusterSet':
                        setManagedClusterSets(JSON.parse(event.data.msg.crsDistribution.crs));
                        break;    
                    case 'ManifestWork':
                        let manifestWorks = JSON.parse(event.data.msg.crsDistribution.crs);
                        setManifestWorks(manifestWorks);
                        break;
                    case 'Placement':
                        setPlacements(JSON.parse(event.data.msg.crsDistribution.crs));
                        break;    
                }
            }
		});
    });

    return (<>
       		    <ShowSelectedContext/>
				<ShowClusterManagers/>
				<ShowManagedClusters managedClusters={managedClusters} />
				<ShowManifestWorks/>
				<ShowSubscriptionReports/>
				<ShowPlacements/>
				<ShowManagedClusterSets/>
				<ShowManagedClusterAddons/>
    </>

    )

}