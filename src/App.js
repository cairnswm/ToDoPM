import React, { lazy, Suspense } from "react";
const Routing = lazy(() => import("./application/routing/routing"));

import "./app.scss";
import { accessElf } from "./auth/utils/accessElf";

const App = () => {
  accessElf.track();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routing />
    </Suspense>
  );
};

export default App;
