import { useState, useEffect} from 'react';
import { OcmResource } from '../../../src/data/loader'
import { kubeImage } from '../common/common';


import ShowClusterManagers from '../comp/ClusterManagers';
import ShowManagedClusters from '../comp/ManagedClusters';
import ShowManifestWorks from '../comp/ManifestWorks';
import ShowSubscriptionReports from '../comp/SubscriptionReports';
import ShowPlacements from '../comp/Placements';
import ShowManagedClusterSets from '../comp/ManagedClusterSets';
import ShowManagedClusterAddons from '../comp/ManagedClusterAddons';
import ClusterManagerDashboard,{ClusterManagerData} from '../comp/ClusterManagerDashboard';

export default function ClusterManagerPage(){
    let [clusterManagers, setClusterManagers] = useState<OcmResource[]>([]);
    let [managedClusters, setManagedClusters] = useState<OcmResource[]>([]);
    let [manifestWorks, setManifestWorks] = useState<OcmResource[]>([]);
    let [managedClusterSets, setManagedClusterSets] = useState<OcmResource[]>([]);
    let [placements, setPlacements] = useState<OcmResource[]>([]);
    let [kubeImages, setKubeImages] = useState<kubeImage[]>([]);
    let [subscriptionReports, setSubscriptionReports] = useState<OcmResource[]>([]);
    let [clusterManagersData, setClusterManagersData] = useState<ClusterManagerData>(Object());

    useEffect(() => {
        window.addEventListener("message", event => {
            if (event.data.images) { 
                //TODO move this logic to Graph 
                setKubeImages(event.data.images)                
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
                    case 'SubscriptionReport':
                        setSubscriptionReports(JSON.parse(event.data.msg.crsDistribution.crs));                     
                        break;       
                }
            }

            clusterManagersData.clusterManagers = clusterManagers
            clusterManagersData.managedClusters = managedClusters
            clusterManagersData.placements = placements
            clusterManagersData.manifestWorks = manifestWorks
            clusterManagersData.managedClusterSets = managedClusterSets
            clusterManagersData.subscriptionReports = subscriptionReports
            clusterManagersData.kubeImages = kubeImages
            setClusterManagersData(clusterManagersData)
		});
    });

    return (<>
				<ClusterManagerDashboard data={clusterManagersData}/>
                <ShowClusterManagers clusterManagers={clusterManagers} />
				<ShowManagedClusters managedClusters={managedClusters} />
				<ShowManifestWorks manifestWorks={manifestWorks} kubeImages={kubeImages}/>
				<ShowSubscriptionReports subscriptionReports={subscriptionReports}  kubeImages={kubeImages}/>
				<ShowPlacements placements={placements}/>
				<ShowManagedClusterSets managedClusterSets={managedClusterSets}/>
				<ShowManagedClusterAddons/>
    </>
    )

}