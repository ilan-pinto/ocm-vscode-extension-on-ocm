import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Uri } from 'vscode';

export type KubeResource =  {
    group: string //  "apps"
    kind:  string // "Deployment"
    name:  string // "hello-world-deployment"
    namespace:  string // "default"
    resource:  string // "deployments"
    version:  string // "v1"
    icon?: Uri
    node?: Node 
}

export type Node = {
    name: string,
    namespace: string, 
    children:KubeResource[] 
}

interface GraphProps {
  data: Node// Adjust the type based on your nested JSON structure
}

export const  Graph: React.FC<GraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    


    // Set up the D3 graph
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width')!;
    const height = +svg.attr('height')!;
    const margin = { top: 40, right: 20, bottom: 40, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create a D3 tree layout
    const tree = d3.tree().size([400, 180]);

    // Convert the nested JSON object to a hierarchical structure
    const root:any = d3.hierarchy(data);
    // Assign positions to the nodes
    tree(root);

    
    // Nodes
    const nodes = d3.select('svg g.nodes')
    .selectAll('circle.node')
    .data(root.descendants())
    .join('g')
    .classed('node', true)   
    .attr('transform', function(d: any) { return `translate(${d.x},${d.y})`; });

    nodes.append('circle')
    .attr('r', 4);
  

   nodes.append('image')
  .attr('xlink:href', function(d: any) { return d.data.icon; })
  .attr('x', -12)
  .attr('y', -12)
  .attr('width', 40)
  .attr('height', 40);


    //add text to node 
    nodes
      .append('text')
      .attr('dy', '3.3em') // Adjust the positioning of the text
      .attr('text-anchor', 'middle') // Center the text horizontally
      .text((d: any) => `${d.data.group}:${d.data.version}:${d.data.name}`);


    // Links
    d3.select('svg g.links')
    .selectAll('line.link')
    .data(root.links())
    .join('line')
    .classed('link', true)
    .attr('x1', function(d: any) {return d.source.x;})
    .attr('y1', function(d: any) {return d.source.y;})
    .attr('x2', function(d: any) {return d.target.x;})
    .attr('y2', function(d: any) {return d.target.y;});



    // Clean up on unmount
    return () => {
      svg.selectAll('*').remove();
    };
  }, [data]);

  return (
    <svg ref={svgRef} width={400} height={220}>       
        <g transform="translate(5, 5)">
        <g className="links"></g>
        <g className="nodes"></g>
        </g>
  </svg>

   
  );
};

export default Graph;
