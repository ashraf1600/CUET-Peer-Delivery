import { Container } from "@/components/shared/Container";
import React from "react";
import MyPost from "./components/MyPost";

const page = () => {
  return (
    <div>
      <Container>
        <MyPost />
      </Container>
    </div>
  );
};

export default page;
