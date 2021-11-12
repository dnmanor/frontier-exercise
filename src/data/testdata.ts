import { RpaData } from "../utilities/types";

export const testRpaData: RpaData = {
  url: "https://frontier.jobs/jobs/190562",
  applyBtn: "*[data-testid='jd-apply-button']",
  firstname: "input[name='fullname']",
  lastname: "input[name='lastname']",
  email: "input[name='email']",
  file: "input[type='file']",
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

export const testJobApplicationPayload = {
  firstname: "Test",
  lastname: "Lastname",
  phone: "+1 234 234 0000",
  location: "London, UK",
  linkedin: "linkedin.com/profile/me",
  resume:
    "https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx",
  email: "yupp@test.com",
  worked_remote: "No",
  worked_startup: "No",
};
