import fs from "fs";

export const logToFile = async (data: string, filename: string) => {
  try {
    fs.appendFileSync(`${filename}.log`, JSON.stringify(data, null, 4), {
      flag: "a+",
      encoding: "utf-8",
    });
  } catch (error) {
    console.log("Error logging data", error);
  }
};
