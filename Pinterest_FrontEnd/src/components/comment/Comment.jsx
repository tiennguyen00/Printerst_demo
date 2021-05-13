import React, { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import {
  Container,
  Wrapper,
  AvatarWrapper,
  UserName,
  Comments,
  AddComment,
  Status,
} from "./styled-components";

const Comment = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await userService.getProfile();
        setData(result);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <AddComment>
        <AvatarWrapper>
          <img src={data.profilePhoto} alt="" />
        </AvatarWrapper>
        <Comments style={{ flex: "1" }}>
          <input
            type="text"
            placeholder="Write your comment"
            style={{ width: "100%", flex: "1" }}
            onChange={handleChange}
          />
        </Comments>
      </AddComment>
      <Status>
        <AvatarWrapper>
          <img src={data.profilePhoto} alt="" />
        </AvatarWrapper>
        <Wrapper>
          <UserName>
            {data.firstName} {data.lastName}
          </UserName>
          <Comments>{data.status}</Comments>
        </Wrapper>
      </Status>
    </Container>
  );
};

export { Comment };
