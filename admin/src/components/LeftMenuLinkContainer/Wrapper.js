import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding-top: 0.7rem;
  position: absolute;
  top: 6rem;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  box-shadow: 0 1px 2px 0 rgba(40,42,49,0.16);

  .title {
    padding-left: 2rem;
    padding-right: 1.6rem;
    padding-top: 1rem;
    margin-bottom: 4.8rem;
    font-size: 2.4rem;
    font-weight: bold;
  }

  .list {
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;
    &.models-list {
      li a svg {
        font-size: 0.74rem;
        top: calc(50% - 0.35rem);
      }
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

  .addWrapper {
    position:absolute;
    right:0;
    top: 22px;
  }

  .addNew {
    display:inline-block;
    width:25px;
    height:25px;
    margin-right:20px;
    position: relative;

    &:after, &:before {
      content:"";
      position:absolute;
      display: block;
      width: 1px;
      border-right: 1px solid #aaa;
      height: 25px;
      left:50%;
    }
    &:before {
      transform: rotate(90deg);
    }
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
