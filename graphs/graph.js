class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  hasVertex(v) {
    return this.adjacencyList.has(v);
  }

  addVertex(v) {
    if (!this.hasVertex(v)) this.adjacencyList.set(v, []);
  }

  addEdge(v1, v2) {
    if (!this.hasVertex(v1)) this.addVertex(v1);
    if (!this.hasVertex(v2)) this.addVertex(v2);
    const existingEdges = this.adjacencyList.get(v1);
    const existingEdgesv2 = this.adjacencyList.get(v2);
    this.adjacencyList.set(v1, [...existingEdges, v2]);
    this.adjacencyList.set(v2, [...existingEdgesv2, v1]);
  }

  removeEdge(v1, v2) {
    const graph = this.adjacencyList;
    let edgesV1 = [];
    let edgesV2 = [];
    if (this.hasVertex(v1)) {
      edgesV1 = graph.get(v1);
    } else {
      return;
    }

    if (this.hasVertex(v1)) {
      edgesV2 = graph.get(v2);
    } else {
      return;
    }

    graph.set(
      v1,
      edgesV1.filter(e => e !== v2)
    );

    graph.set(
      v2,
      edgesV2.filter(e => e !== v1)
    );
  }

  removeVertex(v) {
    if (this.hasVertex(v)) {
      const edges = this.adjacencyList.get(v);
      edges.forEach(e => this.removeEdge(v, e));
    }

    this.adjacencyList.delete(v);
  }

  dfsRecursive(v) {
    const result = [];
    const visited = new Map();
    const adjacencyList = this.adjacencyList;

    (function dfs(v) {
      if (!v) return;
      visited.set(v, true);
      result.push(v);
      const edges = adjacencyList.get(v);
      edges.forEach(e => {
        if (!visited.has(e)) {
          return dfs(e);
        }
      });
    })(v);

    return result;
  }

  dfsIterative(start) {
    let stack = [start];
    const visited = new Map();
    const result = [];

    while (stack.length) {
      let vertex = stack.pop();
      if (!visited.has(vertex)) {
        visited.set(vertex, true);
        result.push(vertex);
        const edges = this.adjacencyList.get(vertex);
        stack = [...stack, ...edges];
      }
    }

    return result;
  }

  bfs(start) {
    let queue = [start];
    const result = [];
    const visited = new Map();
    let currentVertex;
    let edges;

    while (queue.length) {
      currentVertex = queue.shift();
      if (!visited.has(currentVertex)) {
        visited.set(currentVertex, true);
        result.push(currentVertex);
        edges = this.adjacencyList.get(currentVertex);
        queue = [...queue, ...edges];
        //console.log(queue);
      }
    }

    return result;
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "F");

console.log(graph);
console.log(graph.bfs("A"));
