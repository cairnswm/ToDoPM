import React from "react";
import { Container } from "react-bootstrap";
import PageMenu from "../../application/components/pagemenu";

const PageLayout = ({ children }) => {
  const menu = React.Children.toArray(children).find(child => child.type === PageMenu);
  const otherChildren = React.Children.toArray(children).filter(child => child.type !== PageMenu);

  return (
    <>
      {menu && <Container fluid style={{padding:"0px"}}>{menu}</Container>}
      <Container className="py-2">{otherChildren}</Container>
    </>
  );
};

export default PageLayout;
