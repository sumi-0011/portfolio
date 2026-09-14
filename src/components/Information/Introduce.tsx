import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InformationProps } from "@/types";

const Introduce = ({ markdown }: Pick<InformationProps, "markdown">) => {
  // 감싸지 않으면 문단·목록이 부모 flex의 gap-8을 그대로 받아 간격이 벌어짐
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown ?? ""}</ReactMarkdown>
    </div>
  );
};

export default Introduce;
