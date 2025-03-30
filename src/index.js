import React from "react";
import { createRoot } from "react-dom/client";

import "./env";
import Main from "./main";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Main />
);
