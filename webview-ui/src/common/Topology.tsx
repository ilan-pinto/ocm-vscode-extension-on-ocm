import * as React from 'react';
import { kubeImage, resourceTranslationMap } from './common';


import {
  ColaLayout,
  ComponentFactory,
  DefaultEdge,
  DefaultGroup,
  DefaultNode,  
  Graph,
  GraphComponent,
  Layout,
  LayoutFactory,
  Model,
  ModelKind,
  Node,
  NodeModel,
  SELECTION_EVENT,
  Visualization,
  VisualizationProvider,
  VisualizationSurface,
  ForceLayout,
  observer,
  GraphElement

} from '@patternfly/react-topology';

import { RegionsIcon as Icon1 } from '@patternfly/react-icons';
import { FolderOpenIcon as Icon2 } from '@patternfly/react-icons';
import { Icon } from '@patternfly/react-core';

const BadgeColors = [
  {
    name: 'A',
    badgeColor: '#ace12e',
    badgeTextColor: '#0f280d',
    badgeBorderColor: '#486b00'
  },
  {
    name: 'B',
    badgeColor: '#F2F0FC',
    badgeTextColor: '#5752d1',
    badgeBorderColor: '#CBC1FF'
  }
];

interface CustomNodeProps {
  element: GraphElement,
  kubeImages?: kubeImage[]

}


const CustomNode: React.FC<CustomNodeProps> = ({ element }) => {

  const data = element.getData();
  let imageUrl: kubeImage | undefined = { name: "tt", uri: "ttt" }


  const badgeColors = BadgeColors.find(badgeColor => badgeColor.name === data.badge);

  return (
    <DefaultNode
      element={element}
      showStatusDecorator
      badge={data.badge}
      badgeColor={badgeColors?.badgeColor}
      badgeTextColor={badgeColors?.badgeTextColor}
      badgeBorderColor={badgeColors?.badgeBorderColor}
    >
      <g transform={`translate(25, 25)`}>
        <image  width={25} height={25} href={imageUrl?.uri} />
      </g>
    </DefaultNode>
  );
};

const baselineLayoutFactory: LayoutFactory = (type: string, graph: Graph): Layout | undefined => {
    switch (type) {
      case 'Cola':
        return new ForceLayout(graph, { layoutOnDrag: true });
      default:
        return new ColaLayout(graph, { layoutOnDrag: true });
    }
  };
  
  
  const customComponentFactory: ComponentFactory = (kind: ModelKind, type: string) => {
    switch (type) {
      case 'group':
        return DefaultGroup;
      default:
        switch (kind) {
          case ModelKind.graph:
            return  GraphComponent;
          case ModelKind.node:
            return CustomNode;
          case ModelKind.edge:
            return DefaultEdge;
          default:
            return undefined;
        }
    }
  };


type TopologyProps = { 
  nodes: NodeModel[], 
  images: kubeImage[]
}


  export const Topology: React.FC<TopologyProps> = (Props:TopologyProps) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [kubeImages, setKubeImages] = React.useState<kubeImage[]>([]);

    setKubeImages(Props.images)

    const controller = React.useMemo(() => {
      const model: Model = {
        nodes: Props.nodes,
        graph: {
          id: 'g1',
          type: 'graph',
          layout: 'Cola'
        }
      };
  
      const newController = new Visualization();
      newController.registerLayoutFactory(baselineLayoutFactory);
      newController.registerComponentFactory(customComponentFactory);
  
      newController.addEventListener(SELECTION_EVENT, setSelectedIds);
  
      newController.fromModel(model, false);
  
      return newController;
    }, []);
  
    return (
      <VisualizationProvider controller={controller}>
        <VisualizationSurface state={{ selectedIds }} />
      </VisualizationProvider>
    );
  };