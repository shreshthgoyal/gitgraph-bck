const TreeSitter = require('tree-sitter');
const Python = require('tree-sitter-python');

class CodeAnalyzer {
  constructor() {
    this.parser = new TreeSitter();
    this.parser.setLanguage(Python);
  }

  analyzeCode(code, filePath) {
    const tree = this.parser.parse(code);
    let functions = [];
    let imports = [];

    const traverse = (node) => {
      switch (node.type) {
        case 'import_statement':
        case 'import_from_statement':
          imports.push(node.text);
          break;
        case 'function_definition':
          const functionName = node.childForFieldName('name')?.text;
          if (functionName) {
            functions.push(functionName);
          }
          break;
      }
      node.children.forEach(traverse);
    };

    traverse(tree.rootNode);

    return { filePath, functions, imports };
  }
}

module.exports = CodeAnalyzer;
