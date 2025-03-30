import React, { Suspense } from "react";
const Providers = React.lazy(() => import("./application/context/providers"));

const Main = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Providers />
    </Suspense>
  );
};

export default Main;
