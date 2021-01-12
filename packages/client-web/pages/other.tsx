import React from 'react';
import { NavOnlyLayout } from '@my-project/client-web/components/common/Layout/NavOnly';
import { LayoutNavigationProvider } from '@my-project/client-web/contexts/Layout/Navigation';
import { PageHead } from '@my-project/client-web/components/common/Page/Head';
import {
  withDefaultPage,
  withDefaultServerProps
} from '@my-project/client-web/page-modules/presets/default';
import { Text } from '@my-project/uikit-web/Typography';

interface OtherPageProps {
  value: number;
}

export const getServerSideProps = withDefaultServerProps<OtherPageProps>(async () => {
  await new Promise(r => setTimeout(r, 100));
  return {
    value: Math.ceil(100 + Math.random() * 500)
  };
});

export default withDefaultPage()(function OtherPage({ value }: OtherPageProps) {
  return (
    <LayoutNavigationProvider>
      <NavOnlyLayout>
        <PageHead title="Other page" description="Page with getServerSideProps" />
        <Text type="h2" gutterBottom>
          Other page (ssr value: {value})
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
      </NavOnlyLayout>
    </LayoutNavigationProvider>
  );
});
