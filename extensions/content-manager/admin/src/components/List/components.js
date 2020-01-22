import styled from 'styled-components';

const ListWrapper = styled.div`
  ul { 
    list-style-type: none;
    padding-left: 0;
    li {
     a {
       padding: 0.8rem 2rem;
       display: inline-block;
     }
    }
  }

  h1 {
    margin-bottom: 15px;
    text-transform: capitalize;

    span.info {
      color: #9e9e9e;
      font-size: 1.2rem;
      font-weight: normal;
    }
  }

  .title {
    position:relative;
  }

  .addNew {
    display:inline-block;
    width:25px;
    height:25px;
    margin-right:20px;
    position:absolute;
    top:0px;
    right: 20px;

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
`;

export {
  ListWrapper,
};
