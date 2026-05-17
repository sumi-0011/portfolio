import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    responseLimit: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "development") {
    res.status(404).json({ error: "Not found" });
    return;
  }

  let browser: Awaited<ReturnType<typeof import("puppeteer").default.launch>> | null = null;
  try {
    const puppeteer = (await import("puppeteer")).default;

    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const host = req.headers.host ?? "localhost:3000";
    const url = `http://${host}/`;

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60_000 });
    await page.emulateMediaType("print");
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="portfolio.pdf"');
    res.setHeader("Content-Length", pdf.length);
    res.status(200).send(Buffer.from(pdf));
  } catch (error) {
    console.error("[/api/pdf] failed:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  } finally {
    if (browser) {
      await browser.close().catch(() => undefined);
    }
  }
};

export default handler;
