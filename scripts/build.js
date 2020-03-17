const createModules = require('./createModules');
const del = require('del')
const fs = require('fs-extra');
const path = require('path')
const svgOptimize = require('./svgOptimize');
const config = require('../package.json');

const BUILD_PATH = path.join(__dirname, '..', 'pkg');

const createPackages = (svgDataList) => {
  let modules = createModules(svgDataList, config);
  del.sync(BUILD_PATH);
  modules.forEach((file) => {
    fs.outputFile(path.join(BUILD_PATH, 'src', file.filepath), file.source);
  })
  fs.outputFile(path.join(BUILD_PATH, 'package.json'), JSON.stringify(
    {
      "name": `${config.name}`,
      "version": `${config.version}`
    }
  ))
};

svgOptimize('src/*.svg', createPackages);
