/*
 *
 * HomePage
 *
 */
/* eslint-disable */
import React, { memo, useMemo } from 'react';
import { get } from 'lodash';
import { auth, LoadingIndicatorPage } from 'strapi-helper-plugin';
import { useModels } from '../../hooks';

import useFetch from './hooks';
import { Block, Container, Wave } from './components';

const HomePage = ({ history: { push } }) => {
  const { error, isLoading, posts } = useFetch();
  // Temporary until we develop the menu API
  const { collectionTypes, singleTypes, isLoading: isLoadingForModels } = useModels();

  const handleClick = e => {
    e.preventDefault();

    push(
      '/plugins/content-type-builder/content-types/plugins::users-permissions.user?modalType=contentType&kind=collectionType&actionType=create&settingType=base&forTarget=contentType&headerId=content-type-builder.modalForm.contentType.header-create&header_icon_isCustom_1=false&header_icon_name_1=contentType&header_label_1=null'
    );
  };

  if (isLoadingForModels) {
    return <LoadingIndicatorPage />;
  }

  const username = get(auth.getUserInfo(), 'firstname', '');

  return (
    <>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Block>
              <Wave />
              <h1>Hello {username}!</h1>
              <p>Welcome to the content management system for <a href="https://digitaldesign.scania.com/home" target="_blank">Scania Digital Design System</a>.</p>

              <h2>Getting Started</h2>
              <p>To get started, add Content from the left menu "Contents". After adding content, you need to connect the content to a page. This can be done from the "Menus" section.</p>
            </Block> 
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
