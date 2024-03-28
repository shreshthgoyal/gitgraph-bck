const path = require('path');

class PathResolver {
  static resolveModuleNameToFilePath(moduleName, filePath) {
    let directoryPath = path.dirname(filePath);
    return path.join(directoryPath, moduleName);
  }

  static resolveImport(importLine, filePath, functionsMap) {
    let moduleName, resolvedFilePath, importedItems = [];
    if (importLine.startsWith('from ')) {
      [moduleName, importedItems] = importLine.replace('from ', '').split(' import ');
      moduleName += '.py';
      resolvedFilePath = this.resolveModuleNameToFilePath(moduleName, filePath);
      if (importedItems.includes('*')) {
        let importedFunctions = functionsMap[resolvedFilePath];
        if (importedFunctions) {
          importedItems = importedFunctions;
        }
      } else {
        importedItems = importedItems.split(',').map(item => item.trim());
      }
    } else {
      moduleName = importLine.split(' ')[1] + '.py';
      let importedFunctions = functionsMap[resolvedFilePath];
      if (importedFunctions) {
        importedItems = importedFunctions;
      }
    }

    
    return [resolvedFilePath, importedItems];
  }
}

module.exports = PathResolver;
