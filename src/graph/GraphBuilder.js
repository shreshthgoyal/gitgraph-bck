const PathResolver = require('../utils/PathResolver');

class GraphBuilder {
  constructor() {
    this.graph = { nodes: [], links: [] };
    this.functionsMap = {};
  }

  addNode(id) {
    if (!this.graph.nodes.some(node => node.id === id)) {
      this.graph.nodes.push({ id });
    }
  }

  addLink(source, target, weight) {
    this.addNode(source);
    this.addNode(target);
    let link = this.graph.links.find(l => l.source === source && l.target === target);
    if (link) {
      if (!link.weights.includes(weight)) {
        link.weights.push(weight);
      }
    } else {
      this.graph.links.push({ source, target, weights: [weight] });
    }
  }

  constructGraph(analysisResults) {
    analysisResults.forEach(({ filePath, functions }) => {
      this.functionsMap[filePath] = functions;
      this.addNode(filePath);
    });

    analysisResults.forEach(({ filePath, imports }) => {
      imports.forEach(importLine => {
        const [resolvedFilePath, importedItems] = PathResolver.resolveImport(importLine, filePath, this.functionsMap);
        if (importedItems) {
          importedItems.forEach(item => this.addLink(resolvedFilePath, filePath, item));
        }
      });
    });

    return this.graph;
  }
}

module.exports = GraphBuilder;
