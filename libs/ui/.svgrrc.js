const { basename, extname } = require('path');

module.exports = {
  icon: true,
  svgo: true,
  prettier: true,
  typescript: true,
  expandProps: false,
  jsxRuntime: 'automatic',
  indexTemplate(files) {
    const items = files.map(file => {
      const fileName = basename(file, extname(file));
      /**
       * Foo -> FooIcon
       * 1Bar -> Svg1BarIcon
       * MyIcon -> MyIconIcon
       */
      const exportName = `${/^\d/.test(fileName) ? `Svg${fileName}` : fileName}Icon`;

      return { fileName, exportName };
    });

    const imports = items.map(
      ({ fileName, exportName }) => `import ${exportName} from "./${fileName}";`
    );
    const exports = items.map(({ exportName }) => exportName);

    return `
    ${imports.join('\n')}

    export {
      ${exports.join(',\n')}
    }`;
  },
  template({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) {
    const viewBox = jsx.openingElement.attributes.find(atr => atr.name.name === 'viewBox');

    return tpl`
    import createSvgIcon from '@libs/ui/SvgIcon/create';

    export default createSvgIcon(
      "${componentName}",
      "${viewBox.value.value}",
      ${jsx.children}
    );
  `;
  }
};
