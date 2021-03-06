import React from 'react';
import { FullLayout } from '@my-project/client-web/components/common/Layout/Full';
import { LayoutNavigationProvider } from '@my-project/client-web/contexts/Layout/Navigation';
import { PageHead } from '@my-project/client-web/components/common/Page/Head';
import {
  withDefaultPage,
  withDefaultServerProps
} from '@my-project/client-web/page-modules/presets/default';
import { Text } from '@my-project/uikit-web/Typography';

export const getServerSideProps = withDefaultServerProps();

export default withDefaultPage()(function IndexPage() {
  return (
    <LayoutNavigationProvider>
      <FullLayout>
        <PageHead title="Main page" description="Static page with full layout" />

        <Text type="h2" gutterBottom>
          Index page
        </Text>

        <Text gutterBottom>
          Lorem ipsum dolor sit amets, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Text>
        <Text gutterBottom>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Text>
      </FullLayout>
    </LayoutNavigationProvider>
  );
});
