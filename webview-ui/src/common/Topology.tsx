import * as React from 'react';
import {
  ColaLayout,
  ComponentFactory,
  DefaultEdge,
  DefaultGroup,
  DefaultNode,
  EdgeStyle,
  Graph,
  GraphComponent,
  Layout,
  LayoutFactory,
  Model,
  ModelKind,
  NodeShape,
  SELECTION_EVENT,
  Visualization,
  VisualizationProvider,
  VisualizationSurface
} from '@patternfly/react-topology';


const baselineLayoutFactory: LayoutFactory = (type: string, graph: Graph): Layout | undefined => {
    switch (type) {
      case 'Cola':
        return new ColaLayout(graph);
      default:
        return new ColaLayout(graph, { layoutOnDrag: false });
    }
  };
  
  const baselineComponentFactory: ComponentFactory = (kind: ModelKind, type: string) => {
    switch (type) {
      case 'group':
        return DefaultGroup;
      default:
        switch (kind) {
          case ModelKind.graph:
            return GraphComponent;
          case ModelKind.node:
            return DefaultNode;
          case ModelKind.edge:
            return DefaultEdge;
          default:
            return undefined;
        }
    }
};

const NODE_SHAPE = NodeShape.ellipse;
const NODE_DIAMETER = 75;  

type TopologyNode = {    
    id: string
    type: string
    label: string
    width?: number,
    height?: number,
    shape?: string
}

  export const TopologyGettingStartedDemo: React.FC = ({data}) => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  
    const controller = React.useMemo(() => {
      const model: Model = {
        nodes: NODES,
        edges: EDGES,
        graph: {
          id: 'g1',
          type: 'graph',
          layout: 'Cola'
        }
      };
  
      const newController = new Visualization();
      newController.registerLayoutFactory(baselineLayoutFactory);
      newController.registerComponentFactory(baselineComponentFactory);
  
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