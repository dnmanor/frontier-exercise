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
    const page: Page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.setDefaultTimeout(0);

    await visitURL(application.form.url, page, DEFAULT_TIMEOUT);

    await page.waitForSelector(application.form.applyBtn, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await clickElement(application.form.applyBtn, page, DEFAULT_TIMEOUT);

    await page.waitForSelector(application.form.firstname, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await type(
      application.form.firstname,
      page,
      application.firstname,
      DEFAULT_DELAY
    );
    await type(
      application.form.lastname,
      page,
      application.lastname,
      DEFAULT_DELAY
    );
    await type(application.form.email, page, application.email, DEFAULT_DELAY);
    await type(application.form.phone, page, application.phone, DEFAULT_DELAY);
    await typeLocation(
      page,
      application.form.locationSelector,
      application.form.optionSelector,
      application.location
    );

    await sleeper(2000).then(() => {
      clickElement(application.form.resumeBtn, page, DEFAULT_TIMEOUT);
    });

    await page.waitForNavigation({
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    await uploadFile(page, application.form.file, application.resume);

    await sleeper(6000).then(() => {
      clickElement(application.form.optionalQuestionsBtn, page, DEFAULT_DELAY);
    });

    await page.waitForNavigation({
      waitUntil: ["networkidle0", "domcontentloaded"],
    });

    await sleeper(DEFAULT_TIMEOUT).then(() => {
      singleSelect(application.form.remoteQt, page, application.worked_remote);
    });

    await sleeper(DEFAULT_TIMEOUT).then(() => {
      singleSelect(
        application.form.startUpQt,
        page,
        application.worked_startup
      );
    });

    await type(
      application.form.linkedin,
      page,
      application.linkedin,
      DEFAULT_DELAY
    );

    await page.waitForSelector(application.form.reviewBtn, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await clickElement(application.form.reviewBtn, page, DEFAULT_DELAY);

    await page.waitForSelector(application.form.doneBtn, {
      timeout: DEFAULT_TIMEOUT,
      visible: true,
    });

    await clickElement(application.form.doneBtn, page, DEFAULT_DELAY);

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
