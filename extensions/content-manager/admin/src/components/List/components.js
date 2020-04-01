import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
.link {
  position: relative;
  padding: 0.8rem 2.2rem;
  margin-left:-15px;
  margin-right:-15px;
  cursor: pointer;
  color: ${props => props.theme.main.colors.leftMenu['link-color']};
  text-decoration: none;
  display: block;
  -webkit-font-smoothing: antialiased;

  &:hover {
    color: ${props => props.theme.main.colors.white};
    background: ${props => props.theme.main.colors.leftMenu['link-hover']};
    text-decoration: none;
  }

  &:focus {
    color: ${props => props.theme.main.colors.white};
    text-decoration: none;
  }
}

.linkActive {
  color: ${props => props.theme.main.colors.white};
  // border-left: 0.3rem solid ${props => props.theme.main.colors.strapi.blue};
  background: ${props => props.theme.main.colors.leftMenu['link-hover']};
}
`;

const Search = styled.div`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  height: 38px;
  padding-right: 20px;
  background-color: #ffffff;
  border: 1px solid #C8C9C7;
  border-radius: 3px;
  color: #9ea7b8;
  line-height: 6rem;
  letter-spacing: 0;
  margin-bottom:30px;

  > div:first-child {
    margin-left:10px;
    margin-right: 10px;
    > svg {
      color: #b3b5b9;
      vertical-align: middle;
    }
  }

  input {
    position: relative;
    width: 100%;
    outline: 0;

    &::placeholder {
      color: #9ea7b8 !important;
      font-size: 13px !important;
    }
  }

  > div:nth-child(2) {
    display: flex;
    flex: 2;
  }
`;

export {
  Wrapper,
  Search
};
