/**
 *
 * LeftMenuLinkContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { get, snakeCase, isEmpty, map, sortBy } from 'lodash';

import LeftMenuLink from '../LeftMenuLink';
import Wrapper from './Wrapper';
// import messages from './messages.json';

function LeftMenuLinkContainer({ plugins, ...rest }) {
  // Generate the list of sections
  const pluginsSections = Object.keys(plugins).reduce((acc, current) => {
    plugins[current].leftMenuSections.forEach((section = {}) => {
      if (!isEmpty(section.links)) {
        acc[snakeCase(section.name)] = {
          name: section.name,
          links: get(acc[snakeCase(section.name)], 'links', []).concat(
            section.links
              .filter(link => link.isDisplayed !== false)
              .map(link => {
                link.source = link.source || current;
                link.plugin = !isEmpty(plugins[link.plugin])
                  ? link.plugin
                  : plugins[current].id;

                return link;
              })
          ),
        };
      }
    });

    return acc;
  }, {});

  const linkSections = Object.keys(pluginsSections).map((current, j) => {
    const contentTypes = pluginsSections[current].links;

    return (
      <div key={j}>
        <div className="row">
          <div className="col-md-8">
            <h1 className="title">{pluginsSections[current].name}</h1>
          </div>
          {/* TODO: Do not use modal and show create new content type in a new page */}
          <div className="col-md-4 addWrapper">
            <a className="addNew" href={`/plugins/content-type-builder/models/content?modalType=model&settingType=base&actionType=create`}></a>
          </div>
        </div>
        
        <ul className="list">
          {sortBy(contentTypes, 'label').map((link, i) => (
            <LeftMenuLink
              {...rest}
              key={`${i}-${link.label}`}
              icon={link.icon || 'caret-right'}
              label={link.label}
              destination={`/plugins/${link.plugin}/${link.destination ||
                link.uid}`}
              source={link.source}
            />
          ))}
        </ul>
      </div>
    );
  });

  return (
    <Wrapper>
      {linkSections}
    </Wrapper>
  );
}

LeftMenuLinkContainer.propTypes = {
  plugins: PropTypes.object.isRequired,
};

export default LeftMenuLinkContainer;
