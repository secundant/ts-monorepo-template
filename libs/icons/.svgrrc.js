module.exports = {
  icon: true,
  memo: true,
  svgo: true,
  prettier: true,
  typescript: true,
  expandProps: false,
  jsxRuntime: 'automatic',
  template({ imports, interfaces, componentName, props, jsx, exports }, { tpl }) {
    const viewBox = jsx.openingElement.attributes.find(atr => atr.name.name === 'viewBox');

    return tpl`
    ${imports}
    ${interfaces}

    function ${componentName}(${props}) {
      return ${jsx};
    }

    ${componentName}.defaultProps = {
      viewBox: "${viewBox.value.value}"
    };
    ${exports}
  `;
  }
};
