import UAParser from 'ua-parser-js';
import { IServerPropsMiddleware } from '@my-project/client-web/services/ServerPropsContext/IServerPropsMiddleware';
import {
  ThemeDeviceType,
  ThemeProvider,
  ThemeProviderServerProps
} from '@my-project/client-web/styles/ThemeProvider';
import { createHOC } from '@my-project/client-web/page-modules/core/createHOC';

export function withThemeServerProps(): IServerPropsMiddleware<ThemeProviderServerProps> {
  return ctx => {
    const parser = new UAParser(ctx.request.headers['user-agent']);
    const { type } = parser.getDevice();

    return {
      themeOptions: {
        deviceType: toSupportedDeviceType(type ?? '')
      }
    };
  };
}

export function withTheme() {
  return createHOC({
    Component: ThemeProvider,
    extractProps: ['themeOptions']
  });
}

const toSupportedDeviceType = (type: string): ThemeDeviceType =>
  ['mobile', 'tablet'].includes(type) ? (type as ThemeDeviceType) : 'desktop';
