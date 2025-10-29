let idCounter = 1;
function nextId() {
  return "node_" + idCounter++;
}

function buildNodesEdges(
  value,
  key,
  path = "$",
  depth = 0,
  x = 0,
  positions = { x: 0 }
) {
  // positions.x will be incremented as leaf nodes are placed (simple layout)
  const nodes = [];
  const edges = [];

  const id = nextId();
  const displayLabel =
    key === null
      ? Array.isArray(value)
        ? "root (array)"
        : "root (object)"
      : key;
  const type =
    value !== null && typeof value === "object"
      ? Array.isArray(value)
        ? "array"
        : "object"
      : "primitive";

  const baseNode = {
    id,
    data: { label: displayLabel, raw: value, path },
    className:
      type === "object"
        ? "objectNode"
        : type === "array"
        ? "arrayNode"
        : "primitiveNode",
  };

  if (type === "primitive") {
    baseNode.position = { x: positions.x * 200, y: depth * 120 };
    positions.x += 1;
    baseNode.data.display = `${displayLabel}: ${String(value)}`;
    nodes.push(baseNode);
    return { nodes, edges, id };
  }

  // object or array
  // allocate parent at x = middle of children; first compute children
  const childrenInfo = [];
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const childPath = `${path}[${i}]`;
      const info = buildNodesEdges(
        value[i],
        `[${i}]`,
        childPath,
        depth + 1,
        0,
        positions
      );
      childrenInfo.push(info);
    }
  } else {
    for (let k of Object.keys(value)) {
      const childPath = path === "$" ? `$.${k}` : `${path}.${k}`;
      const info = buildNodesEdges(
        value[k],
        k,
        childPath,
        depth + 1,
        0,
        positions
      );
      childrenInfo.push(info);
    }
  }

  // place parent x at average of children positions (if has children), else place at current x
  const childXs = childrenInfo.map((ci) => {
    const n = ci.nodes[0];
    return n.position ? n.position.x : 0;
  });

  const parentX = childXs.length
    ? childXs.reduce((a, b) => a + b, 0) / childXs.length
    : positions.x * 200;
  baseNode.position = { x: parentX, y: depth * 120 };
  baseNode.data.display = Array.isArray(value)
    ? `Array[${value.length}]`
    : `Object{${Object.keys(value).length}}`;
  nodes.push(baseNode);

  // stitch children nodes & edges
  for (let ci of childrenInfo) {
    // ci.nodes and ci.edges must be appended
    for (let nn of ci.nodes) nodes.push(nn);
    for (let ee of ci.edges) edges.push(ee);
    // connect parent -> child (first node in ci.nodes is child root)
    edges.push({
      id: `e${baseNode.id}-${ci.id}`,
      source: baseNode.id,
      target: ci.id,
      animated: false,
      markerEnd: { type: "arrowclosed" },
    });
  }

  return { nodes, edges, id: baseNode.id };
}

export function jsonToFlow(json) {
  idCounter = 1;
  const { nodes, edges } = buildNodesEdges(json, null, "$", 0, 0, { x: 0 });
  // remove duplicates (in case)
  const uniqueNodes = Array.from(new Map(nodes.map((n) => [n.id, n])).values());
  return { nodes: uniqueNodes, edges };
}
