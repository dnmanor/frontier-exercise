import fs from "fs";

export const logToFile = async (data: string, filename: string) => {
  const time: Date = new Date();
  try {
    fs.appendFileSync(
      `${filename}.log`,
      `${time.toISOString()} ->` + `${JSON.stringify(data, null, 4)} \r\n`,
      {
        flag: "a+",
        encoding: "utf-8",
      }
    );
  } catch (error) {
    console.log("Error logging data", error);
  }
};
