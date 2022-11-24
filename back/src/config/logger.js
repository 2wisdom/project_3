const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, json, simple, colorize } = format;

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

const options = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info",
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

if (process.env.NODE_ENV !== "production") {
  logger.add(options.console);
}

module.exports = logger;
