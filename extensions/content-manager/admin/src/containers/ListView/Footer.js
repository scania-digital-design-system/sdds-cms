import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { GlobalPagination, InputSelect } from 'strapi-helper-plugin';
import useListView from '../../hooks/useListView';
import { FooterWrapper, SelectWrapper, Label } from './components';

function Footer() {
  const {
    count,
    onChangeParams,
    searchParams: { _limit, _page },
  } = useListView();

  return (
    <FooterWrapper className="row">
      <div className="col-12">
        <GlobalPagination
          count={count}
          onChangeParams={({ target: { value } }) => {
            onChangeParams({ target: { name: '_page', value } });
          }}
          params={{
            currentPage: parseInt(_page, 20),
            _limit: parseInt(_limit, 20),
            _page: parseInt(_page, 20),
          }}
        />
      </div>
    </FooterWrapper>
  );
}

export default memo(Footer);
