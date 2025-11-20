import { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { Box } from '@mui/material';

cytoscape.use(coseBilkent);

// PUBLIC_INTERFACE
export default function GraphView({ elements, style }) {
  /**
   * Renders a Cytoscape graph from nodes/edges JSON.
   * elements: { nodes: [{ data: { id, label, ... } }], edges: [{ data: { id, source, target, label } }] }
   */
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy previous instance if any
    if (cyRef.current) {
      cyRef.current.destroy();
      cyRef.current = null;
    }

    const defaultElements = elements ?? {
      nodes: [
        { data: { id: 'me', label: 'You' } },
        { data: { id: 'skill1', label: 'Cloud' } },
        { data: { id: 'skill2', label: 'Kubernetes' } },
        { data: { id: 'role', label: 'SRE' } }
      ],
      edges: [
        { data: { id: 'e1', source: 'me', target: 'skill1', label: 'learn' } },
        { data: { id: 'e2', source: 'skill1', target: 'skill2', label: 'advance' } },
        { data: { id: 'e3', source: 'skill2', target: 'role', label: 'target' } }
      ]
    };

    const cy = cytoscape({
      container: containerRef.current,
      elements: defaultElements,
      style: [
        { selector: 'node', style: { 'background-color': '#3b82f6', 'label': 'data(label)', 'color': '#fff', 'text-outline-width': 2, 'text-outline-color': '#3b82f6', 'font-size': 12 } },
        { selector: 'edge', style: { 'line-color': '#64748b', 'target-arrow-color': '#64748b', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier', 'label': 'data(label)', 'font-size': 10, 'text-background-color': '#eceff1', 'text-background-opacity': 0.6, 'text-background-padding': 2 } },
        ...(style ?? [])
      ],
      layout: { name: 'cose-bilkent', fit: true, animate: false }
    });

    cyRef.current = cy;

    const resize = () => cy.resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cy.destroy();
      cyRef.current = null;
    };
  }, [elements, style]);

  return <Box sx={{ width: '100%', height: 520, borderRadius: 2, border: '1px solid', borderColor: 'divider' }} ref={containerRef} />;
}
