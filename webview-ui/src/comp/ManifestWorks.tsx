import { OcmResource } from '../../../src/data/loader'
import { Card, CardBody, CardHeader, Gallery, GalleryItem, Title } from '@patternfly/react-core';
import {Graph, Node, KubeResource } from '../common/Graph';
import { kubeImage } from '../common/common';
import { Topology } from '../common/Topology';
import { NodeModel, NodeShape, NodeStatus } from '@patternfly/react-topology';
import { namespace } from 'd3';

type manifestWorksProps = {
    manifestWorks: OcmResource[] , 
    kubeImages: kubeImage[]
}

type namespaceGroup = {
    namespace: string 
    childrens: string[]
}


export default function ShowManifestWorks( Props: manifestWorksProps ) {


    const manifestWorksResource: Node[] = Props.manifestWorks.map(manifestWork => {
        const kubeResources: KubeResource[] =  manifestWork.kr.status.resourceStatus.manifests.map( ( mf:any )=> {
            return mf.resourceMeta
        })
        return {    name: manifestWork.kr.metadata.name ,
                    namespace: manifestWork.kr.metadata.namespace ,
                    children: kubeResources 
            }
        
    })

    // const nodes: NodeModel[] = Props.manifestWorks.map(manifestWork => { 

    //     return manifestWork.kr.status.resourceStatus.manifests.map( ( mf:any )=> { 
           
    //         return { 
    //                 id: mf.resourceMeta.name,
    //                 type: 'node',
    //                 label: mf.resourceMeta.name, 
    //                 shape:  NodeShape.ellipse,   
    //                 width: 75,
    //                 height: 75,                                             
    //                 data: {
    //                     kind: mf.resourceMeta.kind,
    //                     namespace: manifestWork.kr.metadata.namespace,
    //                     name: manifestWork.kr.metadata.name,
    //                     isAlternate: false,
    //                     badge: 'B',
    //                     conditions: mf.resourceMeta.conditions
    //                 }
    //             }
    //         })
    //     })
    //     console.log(`nodes`)
    //     console.log(nodes)
        // {
        //     id: 'Group-1',
        //     children: ['node-0', 'node-1', 'node-2'],
        //     type: 'group',
        //     group: true,
        //     label: 'Group-1',
        //     style: {
        //       padding: 40
        //     }
        
    



    return (
        <section className="component-row">
            <Title headingLevel='h2' size='md' style={{ marginTop: '40px' }}>ManifestWorks</Title>
            <Gallery className='ocm-gallery' hasGutter={true} >
            {Props.manifestWorks.map( manifestwork => {   
                return <GalleryItem>
                        <Card>
                            <CardHeader>   
                            <Title headingLevel='h3' size='md'>Cluster Name: {manifestwork.kr.metadata.name }</Title>   
                            <Title headingLevel='h3' size='md'>Name: { manifestwork.kr.metadata.namespace}</Title>                
                            </CardHeader>
                            <CardBody>
                                    {/* <Graph data={manifestwork} images={Props.kubeImages}/> */}

                                    <Topology images={Props.kubeImages} nodes={manifestwork.kr.status.resourceStatus.manifests.map( ( mf:any )=> { 
                                                                            return { 
                                                                                    id: mf.resourceMeta.name,
                                                                                    type: 'node',
                                                                                    label: mf.resourceMeta.name, 
                                                                                    shape:  NodeShape.ellipse,   
                                                                                    width: 75,
                                                                                    height: 75,                                             
                                                                                    data: {
                                                                                        kind: mf.resourceMeta.kind,
                                                                                        namespace: manifestwork.kr.metadata.namespace,
                                                                                        name: manifestwork.kr.metadata.name,
                                                                                        isAlternate: false,
                                                                                        badge: 'B',
                                                                                        conditions: mf.resourceMeta.conditions
                                                                                    }
                                                                                }
                                                                            })} 
                                /> 
                            </CardBody>
                            </Card>
                        </GalleryItem>   
            })}
            </Gallery>
        </section>
    );
}
