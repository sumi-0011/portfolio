import { useEffect, useState } from "react";

type Mode = "preview" | "download";

const PrintButton = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState<Mode | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const run = async (mode: Mode) => {
    if (loading) return;
    setLoading(mode);
    try {
      const res = await fetch("/api/pdf", { method: "GET" });
      if (!res.ok) {
        throw new Error(`PDF 생성 실패 (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (mode === "preview") {
        window.open(url, "_blank", "noopener,noreferrer");
        // 새 탭이 PDF를 로드할 시간을 주고 URL 해제
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = "portfolio.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error(error);
      window.alert("PDF 생성에 실패했어요. 콘솔을 확인해주세요.");
    } finally {
      setLoading(null);
    }
  };

  if (!mounted) return null;
  if (process.env.NODE_ENV !== "development") return null;

  const baseClass =
    "no-print flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="no-print fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        type="button"
        onClick={() => run("preview")}
        disabled={loading !== null}
        aria-label="PDF 미리보기"
        className={`${baseClass} bg-white text-BLACK border border-GRAY_LIGHT hover:bg-GRAY_LIGHT dark:bg-GRAY_EXTRAHEAVY dark:text-white dark:border-GRAY_HEAVY dark:hover:bg-BLACK`}
      >
        {loading === "preview" ? (
          <Spinner />
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
        {loading === "preview" ? "여는 중..." : "미리보기"}
      </button>
      <button
        type="button"
        onClick={() => run("download")}
        disabled={loading !== null}
        aria-label="PDF로 저장"
        className={`${baseClass} bg-BLACK text-white hover:bg-PRIMARY_HEAVY dark:bg-white dark:text-BLACK dark:hover:bg-PRIMARY`}
      >
        {loading === "download" ? (
          <Spinner />
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
        {loading === "download" ? "생성 중..." : "PDF 저장"}
      </button>
    </div>
  );
};

const Spinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default PrintButton;
