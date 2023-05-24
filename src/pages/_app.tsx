import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

/**
 * @description SEO를 위해 본인의 정보로 수정해주세요.
 */
const DEFAULT_SEO = {
  title: "변수미 | Front-End Dev",
  description: "안녕하세요, 프론트엔드 개발자 변수미입니다.",
  canonical: "https://github.com/sumi-0011",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://github.com/sumi-0011",
    title: "변수미 | Front-End Dev",
    site_name: "변수미 | Front-End Dev",
    images: [
      {
        url: "/emoji.png",
        width: 200,
        height: 200,
        alt: "변수미 | Front-End Dev",
      },
    ],
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/emoji.png",
    },
  ],
  additionalMetaTags: [
    {
      name: "application-name",
      content: "변수미 | Front-End Dev",
    },
    {
      name: "msapplication-tooltip",
      content: "변수미 | Front-End Dev",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
