import { ICompileInfo, ISourceInfo } from '@app/icons/types';
import svgr from '@svgr/core';

export async function compileSource({ content, name }: ISourceInfo): Promise<ICompileInfo> {
  const typescriptJSXContent = await svgr(
    content,
    {
      icon: true,
      memo: true,
      plugins: [
        require.resolve('@svgr/plugin-svgo'),
        require.resolve('@svgr/plugin-jsx'),
        require.resolve('@svgr/plugin-prettier')
      ],
      template: MUITemplate,
      typescript: true
    },
    {
      componentName: name
    }
  );

  return {
    typescriptJSX: {
      content: typescriptJSXContent
    }
  };
}

function MUITemplate({ template }: any, _: any, { imports, componentName, jsx }: any): any {
  const templateInstance = template.smart({ plugins: ['jsx', 'typescript'] });
  const viewBox = jsx.openingElement.attributes.find((atr: any) => atr.name.name === 'viewBox');

  return templateInstance.ast`
    import SvgIcon, { SvgIconProps }  from '@material-ui/core/SvgIcon'
    ${imports}

    function ${componentName}(props: SvgIconProps) {
      return React.createElement(SvgIcon, props, ${jsx.children});
    }

    ${componentName}.defaultProps = {
      viewBox: "${viewBox.value.value}"
    };

    export default React.memo(${componentName});
  `;
}
