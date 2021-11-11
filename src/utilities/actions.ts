import { Application } from "express";
import { Page } from "puppeteer";
import { downloadFile, generateFileName } from "./helpers";
import { logToFile } from "./logger";

export const visitURL = async (url: string, page: Page, timeout: number) => {
  await logToFile("Visiting " + url, "rpabot");
  await page.goto(url, { waitUntil: ["networkidle0", "domcontentloaded"] });
  await logToFile("Currently on " + url, "rpabot");
  return;
};

export const clickElement = async (
  selector: string,
  page: Page,
  delay: number
) => {
  await logToFile("Clicking Element", "rpabot");
  await page.click(selector);
  //   await page.waitForNavigation({
  //     waitUntil: ["load"],
  //   });
  return;
};

export const type = async (
  selector: string,
  page: Page,
  value: string,
  delay: number
) => {
  await logToFile("Typing " + value + " on form", "rpabot");
  await page.click(selector);
  await page.keyboard.type(value);
  return;
};

export const typeLocation = async (
  page: Page,
  locationSelector: string,
  optionSelector: string,
  location: string
) => {
  await await logToFile("Typing " + location + " on form", "rpabot");
  await page.focus(locationSelector);
  await page.click(locationSelector);
  await page.keyboard.type(location, { delay: 300 });
  await logToFile("Waiting for Location Options", "rpabot");
  await page.waitForSelector(optionSelector, { visible: true });
  await logToFile("Options Available", "rpabot");
  await page.click(locationSelector);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  return;
};

export const uploadFile = async (
  page: Page,
  fileSelector: string,
  fileUrl: string
) => {
  const filePath = generateFileName(fileUrl);
  await downloadFile(fileUrl, filePath);
  const resumeUploadInput = await page.$(fileSelector);
  await resumeUploadInput?.uploadFile(filePath as string);

  await page.waitForFunction(
    () =>
      !document
        .querySelector("div")
        ?.innerText.includes("Upload a file from this device")
  );
};

export const singleSelect = async (
  selectors: any,
  page: Page,
  value: string
) => {
  if (value) {
    const elements = await page.$x(selectors.value);
    await elements[0].click();
  }

  return;
};
