import { RpaData } from "../utilities/types";

export const data: RpaData = {
  url: "https://frontier.jobs/jobs/190562",
  applyBtn: "*[data-testid='jd-apply-button']",
  firstname: "input[name='fullname']",
  lastname: "input[name='lastname']",
  email: "input[name='email']",
  file: "input[type='file']",
  option: "div[role='option']",
  phone: "input[name='phoneno']",
  location: "input[name='location']",
  linkedin: "input[name='linkedin']",
  reviewBtn: "a[href='/jobs/190562/apply/review']",
  resumeBtn: "a[href='/jobs/190562/apply/resume']",
  doneBtn: "a[href='/jobs/190562/apply/done']",
  optionSelector: "*[role='option']",
  locationSelector: "*[name='location']",
  optionalQuestionsBtn: "*[href='/jobs/190562/apply/optional']",
  remoteQt: {
    Yes: "/html/body/div[1]/main/div/div/section/div[1]/div[2]/div/label[1]/span",
    No: "/html/body/div[1]/main/div/div/section/div[1]/div[2]/div/label[2]/span",
  },
  startUpQt: {
    Yes: "/html/body/div[1]/main/div/div/section/div[1]/div[2]/div/label[1]/span",
    No: "/html/body/div[1]/main/div/div/section/div[1]/div[2]/div/label[2]/span",
  },
};
