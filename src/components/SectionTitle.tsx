import React from "react";

import Divider from "./Divider";

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1>{children}</h1>
      <Divider />
    </>
  );
};

export default SectionTitle;
