const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, json, simple, colorize } = format;

const date = new Date();
date.setHours(date.getHours() + 9);
const date_format = date.toISOString().split("T")[0];

// 로그 출력 형식
const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});
const printLogFormat = {
  file: combine(
    label({
      label: "잎게모야",
    }),
    timestamp({ format: "YYYY-MM-DD HH:mm:dd" }),
    // 출력 포멧
    printFormat
  ),
  console: combine(colorize(), simple()),
};

// 로크 저장 파일 위치, 레벨 및 출력 레벨
const options = {
  file: new transports.File({
    filename: `${date_format}.error.log`,
    dirname: "./logs",
    level: "error",
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [options.file],
});

// 로그 출력 유무
if (process.env.NODE_ENV !== "production") {
  logger.add(options.console);
}

module.exports = logger;
