import UAParser from 'ua-parser-js';
import { IServerPropsMiddleware } from '@app/react-nextjs/services/ServerPropsContext/IServerPropsMiddleware';
import {
  ThemeDeviceType,
  ThemeProvider,
  ThemeProviderServerProps
} from '@app/react-nextjs/styles/ThemeProvider';
import { createHOC } from '@app/react-nextjs/page-modules/core/createHOC';

export function withThemeServerProps(): IServerPropsMiddleware<ThemeProviderServerProps> {
  return ctx => {
    const parser = new UAParser(ctx.request.headers['user-agent']);
    const { type } = parser.getDevice();

    return {
      themeOptions: {
        deviceType: toSupportedDeviceType(type)
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
