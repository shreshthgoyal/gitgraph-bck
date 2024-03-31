const GitHubAPI = require('./src/api/GitHubAPI');
const CodeAnalyzer = require('./src/parser/CodeAnalyzer');
const GraphBuilder = require('./src/graph/GraphBuilder');
require('dotenv').config();

class Data {
    constructor() {
        this.gitHubAPI = new GitHubAPI();
        this.codeAnalyzer = new CodeAnalyzer();
        this.graphBuilder = new GraphBuilder();
    }

    async fetchFilesRecursively(url, files = []) {
        const items = await this.gitHubAPI.getFiles(url);
        for (const item of items) {
            if (item.type === 'file' && item.path.endsWith('.py')) {
                files.push(item);
            } else if (item.type === 'dir') {
                await this.fetchFilesRecursively(item.url, files);
            }
        }
        return files;
    }

    async main(repoLink) {
        let graph;
        try {
            const repoContentsUrl = `https://api.github.com/repos/${repoLink}/contents`;
            let files = await this.fetchFilesRecursively(repoContentsUrl);
            const analyses = [];
            for (const file of files) {
                const content = await this.gitHubAPI.fetchFileContent(file.download_url);
                const analysis = this.codeAnalyzer.analyzeCode(content, file.path);
                analyses.push(analysis);
            }
            
            graph = this.graphBuilder.constructGraph(analyses);
            graph.content = {};

            for (const node of graph.nodes) {
                const content = await this.gitHubAPI.fetchFileContent(`https://raw.githubusercontent.com/${repoLink}/main/${node.id}`);
                graph.content[node.id] = content;
            }


        } catch (error) {
            console.error('Error:', error.message);
        }

        console.log(graph)

        return graph;
    }
}

// const data = new Data();

// data.main('MLH-Hackionaire/Project')
// .then(graph => {
//     console.log("Graph Nodes:", graph.nodes);
//     console.log("Graph Links:", graph.links);
// });

module.exports = Data;
