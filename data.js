const TreeSitter = require('tree-sitter');
const Python = require('tree-sitter-python');
const path = require('path');
require('dotenv').config();

const headers = {
  'Authorization': `token ${process.env.GH_TOKEN}`,
};

let graph = { nodes: [], links: [] };

let functionsMap = {};

async function fetchFileContent(url) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Error fetching content from ${url}: ${response.statusText}`);
    }
    const content = await response.text();
    return content;
}

async function analyzePythonCode(code, filePath) {
    const parser = new TreeSitter();
    await parser.setLanguage(Python);
    const tree = parser.parse(code);

    let functions = [];
    let imports = [];

    function traverse(node) {
        switch (node.type) {
            case 'import_statement':
            case 'import_from_statement':
                const importLine = node.text;
                imports.push(importLine);
                break;
            case 'function_definition':
                const functionName = node.childForFieldName('name')?.text;
                if (functionName) {
                    functions.push(functionName);
                }
                break;
        }
        node.children.forEach(traverse);
    }

    traverse(tree.rootNode);

    functionsMap[filePath] = functions;

    return { filePath, functions, imports };
}

async function getFiles(url) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const result = await response.json();
    if (!Array.isArray(result)) {
        throw new Error(`Unexpected response format for ${url}:`, result);
    }

    let analyses = [];
    for (const item of result) {
        if (item.type === 'file' && item.path.endsWith('.py')) {
            const content = await fetchFileContent(item.download_url);
            const analysis = await analyzePythonCode(content, item.path);
            analyses.push(analysis);
        } else if (item.type === 'dir') {
            const dirAnalyses = await getFiles(item.url);
            analyses = analyses.concat(dirAnalyses);
        }
    }
    return analyses;
}

async function constructGraph(analysisResults) {

    graph.nodes = [];
    graph.links = [];

    const addNode = (id) => {
        if (!graph.nodes.some(node => node.id === id)) {
            graph.nodes.push({ id });
        }
    };

    const addLink = (source, target, weight) => {
        addNode(source)
        addNode(target)
        let link = graph.links.find(l => l.source === source && l.target === target);
        if (link) {
            if (!link.weights.includes(weight)) {
                link.weights.push(weight);
            }
        } else {
            graph.links.push({ source, target, weights: [weight] });
        }
    };

    analysisResults.forEach(({ filePath }) => addNode(filePath));

    analysisResults.forEach(({ filePath, imports }) => {
        imports.forEach(importLine => {
            let moduleName, importedItems;
            if (importLine.startsWith('from ')) {
                [moduleName, importedItems] = importLine.replace('from ', '').split(' import ');
            } else if (importLine.startsWith('import ') && importLine.includes('from')) {
                moduleName = importLine.replace('import ', '');
                importedItems = '*'; 
            }
            else 
            {
                return;
            }

            let resolvedFilePath = resolveModuleNameToFilePath(moduleName, filePath);
            if (importedItems === '*') {
                let importedFunctions = functionsMap[resolvedFilePath];
                if (importedFunctions && importedFunctions.length > 0) {
                    addLink(resolvedFilePath, filePath, importedFunctions.join(', '));
                } else {
                    console.warn(`No functions found for import * from ${moduleName} at ${filePath}`);
                }
            }else {
                importedItems.split(', ').forEach(item => {
                    addLink(resolvedFilePath, filePath, item.trim());
                });
            }
        });
    });

}

function resolveModuleNameToFilePath(moduleName, filePath) {
    let directoryPath = path.dirname(filePath);
    if (directoryPath === '.') {
        // No directory in the path, just a filename
        return moduleName + '.py';
    } else {
        // Directory present, replace filename with moduleName
        return path.join(directoryPath, moduleName + '.py');
    }
}

async function main(repoLink) {
    try {
        const repoContentsUrl = `https://api.github.com/repos/${repoLink}/contents`;
        const analysisResults = await getFiles(repoContentsUrl);
        await constructGraph(analysisResults);
    } catch (error) {
        console.error('Error:', error.message);
    }

    return graph;
}

// main('MLH-Hackionaire/Project')
// .then(graph => {
//     console.log("Graph Nodes:", graph.nodes);
//     console.log("Graph Links:", graph.links);
// });

module.exports = main;
