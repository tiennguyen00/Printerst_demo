import styled from "styled-components";

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Wrapper = styled(Container)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  width: fit-content;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
`;

const AddComment = styled(Container)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const Status = styled(Container)`
  flex-direction: row;
  width: 100%;
  margin-top: 20px;
`;

const UserName = styled.h1`
  width: fit-content;
  font-weight: 300;
  font-size: 20px;
`;

const Comments = styled(UserName)`
  font-size: 14px;

  input[type="text"] {
    padding: 10px;
    border-radius: 19px;
    border: none;
    outline: none;
  }
`;

export {
  Container,
  Wrapper,
  AvatarWrapper,
  UserName,
  Comments,
  AddComment,
  Status,
};
