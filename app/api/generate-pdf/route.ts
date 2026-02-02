import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { readFileSync } from "fs";
import { join } from "path";
import { renderTemplate } from "@/lib/pdf";
import { ItineraryFormData } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const data: ItineraryFormData = await request.json();

    // Read the HTML template
    const templatePath = join(process.cwd(), "app", "templates", "itinerary.html");
    let template: string;
    try {
      template = readFileSync(templatePath, "utf-8");
    } catch (fileError) {
      console.error("Template file error:", fileError);
      console.error("Template path:", templatePath);
      console.error("Current working directory:", process.cwd());
      throw new Error(`Template file not found at ${templatePath}`);
    }

    // Render the template with data
    const html = renderTemplate(template, data);

    // Determine if we're running locally or on Vercel
    const isVercel = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;
    const isLocal = !isVercel && process.env.NODE_ENV === "development";

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      args: isLocal ? puppeteer.defaultArgs() : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: isLocal
        ? process.platform === "win32"
          ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
          : process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
          : "/usr/bin/google-chrome"
        : await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Set content and generate PDF
    // Use "load" instead of "networkidle0" for better Vercel compatibility
    await page.setContent(html, {
      waitUntil: "load",
      timeout: 30000,
    });

    // Wait a bit for any dynamic content to render
    await new Promise(resolve => setTimeout(resolve, 1000));

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="travel-itinerary-${data.client_name.replace(/\s+/g, "-")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

