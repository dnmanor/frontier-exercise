export interface JobApplication {
  firstname: string;
  lastname: string;
  phone: string;
  location: string;
  linkedin: string;
  resume: string;
  email: string;
  worked_remote: string;
  worked_startup: string;
}

export interface RpaSubmissionStatus {
  error: Boolean;
  code: number;
}

interface SingleSelect {
  [x: string]: string;
}

export interface RpaData {
  url: string;
  applyBtn: string;
  firstname: string;
  lastname: string;
  email: string;
  file: string;
  option: string;
  phone: string;
  location: string;
  linkedin: string;
  reviewBtn: string;
  resumeBtn: string;
  doneBtn: string;
  locationSelector: string;
  optionSelector: string;
  optionalQuestionsBtn: string;
  remoteQt: SingleSelect;
  startUpQt: SingleSelect;
}
