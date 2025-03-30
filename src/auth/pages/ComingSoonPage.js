import React from "react";
import ComingSoon from "../components/comingsoon";
import PageLayout from "../components/pagelayout";
import BackBar from "../components/backbar";

const ComingsoonPage = () => {
  console.log("Coming Soon")
  return (
    <PageLayout>
      <BackBar />
      <ComingSoon />
    </PageLayout>
  );
};

export default ComingsoonPage;
