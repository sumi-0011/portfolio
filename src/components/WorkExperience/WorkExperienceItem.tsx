import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { WorkExperienceProps } from "@/types";

const WorkExperienceItem = ({ name, position, period, markdown, imgSrc }: WorkExperienceProps) => {
  // 주석을 제거하는 함수
  const removeComments = (text: string) => {
    return text?.replace(/<!--[\s\S]*?-->/g, "") ?? "";
  };

  return (
    // 좌측 회사 정보 컬럼은 내용이 짧아 긴 경력 설명 옆에서 여백만 남아서, 회사 정보를 위 한 줄로 올림
    <div className="flex flex-col gap-2">
      <div className="page-break-avoid flex items-center gap-4">
        {imgSrc && (
          <Image
            src={imgSrc}
            width="200"
            height="200"
            alt={name}
            className="object-cover rounded-lg border-[1px] border-GRAY_LIGHT border-solid w-12 h-12"
          />
        )}
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3>{name}</h3>
          <span className="text-GRAY_HEAVY">{`${position} · ${period[0]} - ${period[1]}`}</span>
        </div>
      </div>
      <div className="markdown w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{removeComments(markdown ?? "")}</ReactMarkdown>
      </div>
    </div>
  );
};

export default WorkExperienceItem;
