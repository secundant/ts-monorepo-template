import { createMuiTheme } from '@material-ui/core/styles';
import { match } from 'css-mediaquery';
import { MuiThemeCreator } from '@app/react-nextjs/styles/ITheme';
import { ThemeDeviceType } from '@app/react-nextjs/styles/ThemeProvider';
import { UADeviceMediaWidth } from '@app/react-nextjs/constants/ssr/ua-device-media-width';

export const makeCreateSsrMuiTheme = (deviceType: ThemeDeviceType): MuiThemeCreator => (
  options,
  ...args
) =>
  createMuiTheme(
    {
      ...options,
      props: {
        ...options.props,
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
