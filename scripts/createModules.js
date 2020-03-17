const getSVGContent = (source) => source.slice(source.indexOf('>') + 1).slice(0, -6);

const createModulePackage = (svgs, config) => {
  const files = svgs.map((svg) => {
    const source = getSVGContent(svg.source);
    const json = JSON.stringify(Object.assign({}, svg, { source }));

    return {
      filepath: `${svg.metadata.name}.js`,
      source: `module.exports = ${json}`
    }
  });

  return files
};

module.exports = createModulePackage;
