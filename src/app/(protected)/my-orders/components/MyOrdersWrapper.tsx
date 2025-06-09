import { Container } from "@/components/shared/Container";
import React from "react";
import MyAllOrders from "./MyAllOrders";

const MyOrdersWrapper = () => {
  return (
    <div>
      <Container>
        <MyAllOrders />
      </Container>
    </div>
  );
};

export default MyOrdersWrapper;
