import fs, { WriteStream } from "fs";
import http from "http";

export const getFileExtension = (fileUrl: string): string => {
  const values = fileUrl.split(".");
  return values.pop() as string;
};

export const generateFileName = (fileUrl: string): string => {
  return `${process.cwd()}/src/assets/resume_${Date.now()}.${getFileExtension(
    fileUrl
  )}`;
};

export const downloadFile = (fileUrl: string, destination: string) =>
  new Promise((resolve, reject) => {
    const file: WriteStream = fs.createWriteStream(destination, {
      flags: "w+",
    });
    http
      .get(fileUrl, function (response) {
        response.pipe(file);
        file.on("finish", function (): void {
          file.close();
          resolve(destination);
        });
      })
      .on("error", reject);
  });

export function sleeper(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
