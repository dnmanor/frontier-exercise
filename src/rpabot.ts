import puppeteer, { Browser, Page } from "puppeteer";
import {
  clickElement,
  singleSelect,
  type,
  typeLocation,
  uploadFile,
  visitURL,
} from "./utilities/actions";
import { sleeper } from "./utilities/helpers";
import { logToFile } from "./utilities/logger";
import {
  JobApplication,
  RpaData,
  RpaSubmissionStatus,
} from "./utilities/types";

const DEFAULT_TIMEOUT = 4000;
const DEFAULT_DELAY = 300;

interface Application extends JobApplication {
  form: RpaData;
}

export const sendApplicationToATS = async (
  application: Application,
  headless: boolean
): Promise<RpaSubmissionStatus> => {
  try {
    const browser: Browser = await puppeteer.launch({
      headless: headless,
    });
    const selectors = application.form;

    const page: Page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.setDefaultTimeout(0);

    await visitURL(selectors.url, page, DEFAULT_TIMEOUT);

    await page.waitForSelector(selectors.applyBtn, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await clickElement(selectors.applyBtn, page, DEFAULT_TIMEOUT);

    await page.waitForSelector(selectors.firstname, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await type(selectors.firstname, page, application.firstname, DEFAULT_DELAY);
    await type(selectors.lastname, page, application.lastname, DEFAULT_DELAY);
    await type(selectors.email, page, application.email, DEFAULT_DELAY);
    await type(selectors.phone, page, application.phone, DEFAULT_DELAY);
    await typeLocation(
      page,
      selectors.locationSelector,
      selectors.optionSelector,
      application.location
    );

    await sleeper(2000).then(() => {
      clickElement(selectors.resumeBtn, page, DEFAULT_TIMEOUT);
    });

    await page.waitForNavigation({
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    await page.waitForSelector(selectors.file, {
      timeout: DEFAULT_TIMEOUT * 2,
    });

    await uploadFile(page)(selectors.file, application.resume);

    await sleeper(6000).then(() => {
      clickElement(selectors.optionalQuestionsBtn, page, DEFAULT_DELAY);
    });

    await page.waitForNavigation({
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    await sleeper(DEFAULT_TIMEOUT).then(() => {
      singleSelect(selectors.remoteQt, page, application.worked_remote);
    });

    await sleeper(DEFAULT_TIMEOUT).then(() => {
      singleSelect(selectors.startUpQt, page, application.worked_startup);
    });

    await type(selectors.linkedin, page, application.linkedin, DEFAULT_DELAY);

    await page.waitForSelector(selectors.reviewBtn, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await clickElement(selectors.reviewBtn, page, DEFAULT_DELAY);

    await page.waitForSelector(selectors.doneBtn, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await clickElement(selectors.doneBtn, page, DEFAULT_DELAY);

    await page.waitForSelector("*[data-testid='form-submission-done-title']", {
      timeout: DEFAULT_TIMEOUT,
    });

    const doneText = await page.$(
      "*[data-testid='form-submission-done-title']"
    );

    if (doneText) {
      await logToFile("Application Submitted Succesfully", "rpabot");
    }

    await browser.close();

    return {
      error: false,
      code: 200,
    };
  } catch (error) {
    return {
      error: true,
      code: 420,
    };
  }
};
