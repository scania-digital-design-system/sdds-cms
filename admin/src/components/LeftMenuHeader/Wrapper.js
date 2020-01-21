import styled from 'styled-components';
import PropTypes from 'prop-types';

import Logo from '../../assets/images/scania-logo.svg';

const Wrapper = styled.div`
  background: ${props => props.theme.main.colors.leftMenu['link-hover']};
  height: ${props => props.theme.main.sizes.header.height};
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(40,42,49,0.16);

  .leftMenuHeaderLink {
    &:hover {
      text-decoration: none;
    }
  }

  .projectName {
    display: block;
    height: 100%;
    width: 100%;
    text-align: center;
    height: ${props => props.theme.main.sizes.header.height};
    vertical-align: middle;
    font-size: 2rem;
    letter-spacing: 0.2rem;
    color: $white;

    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: auto 3rem;
  }
`;

Wrapper.defaultProps = {
  theme: {
    main: {
      colors: {
        leftMenu: {},
      },
      sizes: {
        header: {},
        leftMenu: {},
      },
    },
  },
};

Wrapper.propTypes = {
  theme: PropTypes.object,
};

export default Wrapper;
