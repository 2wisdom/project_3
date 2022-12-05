const logger = require("./config/logger");

const writeLog = (type, merchantId, req, message) => {
  const endTime = Date.mow();
  const timeCost = (endTime - req.startTime) / 1000;

  return type === "info"
    ? logger.info(
        `[merchantId: ${merchantId}] [client IP: ${req.clientIp}] [method: ${
          req.method
        }] [API url: ${decodedURIComponent(
          req.originalUrl
        )}] [message: ${message}] [Time Cost: ${timeCost} s] `
      )
    : logger.error(
        `[merchantId: ${merchantId}] [client IP: ${req.clientIp}] [method: ${
          req.method
        }] [API url: ${decodedURIComponent(
          req.originalUrl
        )}] [message: ${message}] [Time Cost: ${timeCost} s] `
      );
};
module.exports = writeLog;
