import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding-top: 20px;
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  // height: calc(100vh - (6rem + 10.2rem));
  height: calc(100vh - 60px);
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(40,42,49,0.16);

  .title {
    margin-bottom: 45px;
    font-size: 2.4rem;
    font-weight: 600;
    padding-left: 20px;
    // color: ${props => props.theme.main.colors.leftMenu['title-color']};
  }

  .list {
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;
  }

  .addWrapper {
    text-align: right;
  }

  .addNew {
    display:inline-block;
    width:25px;
    height:25px;
    margin-right:20px;

    &:after, &:before {
      content:"";
      position:absolute;
      display: block;
      width: 1px;
      border-right: 1px solid #aaa;
      height: 25px;
    }
    &:before {
      transform: rotate(90deg);
    }
  }

  .noPluginsInstalled {
    color: ${props => props.theme.main.colors.white};
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    font-weight: 300;
    min-height: 3.6rem;
    padding-top: 0.9rem;
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
