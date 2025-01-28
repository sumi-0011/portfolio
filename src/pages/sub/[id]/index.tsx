import path from "path";
import fsPromises from "fs/promises";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NextPage } from "next";

import Layout from "@/components/Layout";
import ResumeTitle from "@/components/ResumeTitle";

interface SubDataProps {
  resumeTitle: {
    title: string;
  };
  subContent: {
    markdown: string;
  };
}

const SubPage: NextPage<SubDataProps> = ({ resumeTitle, subContent }) => {
  const removeComments = (text: string) => {
    return text?.replace(/<!--[\s\S]*?-->/g, "") ?? "";
  };

  return (
    <div>
      <ResumeTitle resumeTitle={resumeTitle} />
      <Layout>
        <div>
          <div className="markdown w-full whitespace-pre-wrap">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {removeComments(subContent.markdown ?? "")}
            </ReactMarkdown>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SubPage;

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const filePath = path.join(process.cwd(), "data.json");
  const jsonData = await fsPromises.readFile(filePath, "utf8");
  const objectData = JSON.parse(jsonData);

  const id = params.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const subContent = await getMd({ section: "sub", item: { id } });

  if (!subContent) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...objectData,
      subContent,
    },
  };
};

interface SubProps {
  id: string;
}

const getMd = async ({ section, item }: { section: string; item: SubProps }) => {
  try {
    const markdownModule = await import(
      `../../../../public/markdown/${section}/${"id" in item ? item.id : "introduce"}.md`
    );
    return { ...item, markdown: markdownModule.default as string };
  } catch {
    console.log("no markdown");
    return item;
  }
};
