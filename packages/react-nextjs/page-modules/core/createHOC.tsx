import { ComponentType, memo } from 'react';
import { equals, omit } from 'ramda';

export function createHOC<WrapperProps extends {}>({
  extractProps,
  Component
}: HOCOptions<WrapperProps>): HOC<WrapperProps> {
  return <Props extends {}>(
    TargetComponent: ComponentType<Props>
  ): ComponentType<Props & WrapperProps> => {
    const getForwardedProps = omit(extractProps);

    const WrappedComponent = memo<Props & WrapperProps>(
      props => {
        const forwardedProps = getForwardedProps(props);

        return (
          <Component {...props}>
            <TargetComponent {...(forwardedProps as Props)} />
          </Component>
        );
      },
      (left, right) => extractProps.every(key => equals(left[key], right[key]))
    );

    const displayName = `with${Component.displayName ?? Component.name}(${
      TargetComponent.displayName ?? TargetComponent.name
    })`;

    WrappedComponent.displayName = displayName;
    Object.defineProperty(WrappedComponent, 'name', {
      value: displayName
    });
    return WrappedComponent;
  };
}

export interface HOC<WrapperProps extends {}> {
  <Props extends {}>(Component: ComponentType<Props>): ComponentType<Props & WrapperProps>;
}

export interface HOCOptions<WrapperProps extends {}> {
  Component: ComponentType<WrapperProps>;
  extractProps: Array<keyof WrapperProps>;
}
