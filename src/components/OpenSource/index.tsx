import SectionTitle from "../SectionTitle";
import OpenSourceItem from "./OpenSourceItem";

import { DataProps } from "@/types";

const OpenSource = ({ openSource }: Pick<DataProps, "openSource">) => {
  console.log("openSource: ", openSource);
  return (
    <div>
      <SectionTitle>Award</SectionTitle>
      <div className="flex flex-col gap-12">
        {[...openSource].reverse().map((item) => (
          <OpenSourceItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default OpenSource;
