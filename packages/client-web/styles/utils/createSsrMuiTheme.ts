import { createMuiTheme } from '@material-ui/core/styles';
import { match } from 'css-mediaquery';
import { MuiThemeCreator } from '@my-project/client-web/styles/ITheme';
import { ThemeDeviceType } from '@my-project/client-web/styles/ThemeProvider';
import { UADeviceMediaWidth } from '@my-project/client-web/constants/ssr/ua-device-media-width';

export const makeCreateSsrMuiTheme = (deviceType: ThemeDeviceType): MuiThemeCreator => (
  options,
  ...args
) =>
  createMuiTheme(
    {
      ...options,
      props: {
        ...options?.props,
        MuiUseMediaQuery: {
          ssrMatchMedia: query => ({
            matches: match(query, {
              width: UADeviceMediaWidth[deviceType]
            })
          })
        }
      }
    },
    ...args
  );
