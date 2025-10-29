import React, { useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls as RFControls,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { jsonToFlow } from "../utils/jsonToFlow";
import { MdDownload } from "react-icons/md";

function TreeVisualizerInner({ json, searchPath, onSearchResult }) {
  const [rfNodes, setRfNodes] = useState([]);
  const [rfEdges, setRfEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const reactFlowInstanceRef = useRef(null);
  const reactFlow = useReactFlow();
  const flowWrapper = useRef(null);

  // Build nodes & edges when JSON changes
  useEffect(() => {
    if (!json) {
      setRfNodes([]);
      setRfEdges([]);
      setSelectedNodeId(null);
      return;
    }
    const { nodes, edges } = jsonToFlow(json);
    const mapped = nodes.map((n) => ({
      ...n,
      data: { ...n.data, label: n.data.display || n.data.label },
    }));
    setRfNodes(mapped);
    setRfEdges(edges);
  }, [json]);

  // Handle search
  useEffect(() => {
    if (!searchPath || !rfNodes.length) {
      onSearchResult?.({ found: false });
      return;
    }

    const normalized = searchPath.trim();
    const tryPaths = normalized.startsWith("$")
      ? [normalized]
      : [normalized, "$." + normalized];

    const match = rfNodes.find((n) => tryPaths.includes(n.data.path));
    if (!match) {
      setSelectedNodeId(null);
      onSearchResult?.({ found: false });
      return;
    }

    setSelectedNodeId(match.id);
    onSearchResult?.({ found: true, node: match });

    const inst = reactFlowInstanceRef.current || reactFlow;
    if (inst && match.position) {
      requestAnimationFrame(() => {
        try {
          inst.setCenter(match.position.x, match.position.y, {
            zoom: 1.2,
            duration: 500,
          });
        } catch {
          inst.fitView({ padding: 0.5 });
        }
      });
    }
  }, [searchPath, rfNodes]);

  const onInit = (instance) => {
    reactFlowInstanceRef.current = instance;
  };

  const onNodeClick = (_, node) => {
    navigator.clipboard?.writeText(node.data.path);
    setSelectedNodeId(node.id);
  };

  const nodesWithHighlight = rfNodes.map((n) => ({
    ...n,
    className:
      n.id === selectedNodeId
        ? `${n.className || ""} highlight`
        : (n.className || "").replace(" highlight", ""),
  }));

  // Download the image
  const handleDownload = async () => {
    const flowElement = flowWrapper.current.querySelector(".react-flow");
    if (!flowElement) return;

    const { toPng } = await import("html-to-image");
    try {
      const dataUrl = await toPng(flowElement, { quality: 1.0 });
      const link = document.createElement("a");
      link.download = "json-tree.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error exporting image:", err);
    }
  };

  return (
    <div
      ref={flowWrapper}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={nodesWithHighlight}
        edges={rfEdges}
        fitView
        onInit={onInit}
        onNodeClick={onNodeClick}
        panOnScroll
        zoomOnScroll
        panOnDrag
      >
        <Background gap={16} />
        <RFControls />
      </ReactFlow>

      {/* Download button */}
      <button className="btn download-btn" onClick={handleDownload}>
        <MdDownload size={17} />
      </button>
    </div>
  );
}

export default function TreeVisualizer(props) {
  return (
    <ReactFlowProvider>
      <TreeVisualizerInner {...props} />
    </ReactFlowProvider>
  );
}
