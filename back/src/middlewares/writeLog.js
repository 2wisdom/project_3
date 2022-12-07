const logger = require("../config/logger");

const writeLog = (type, merchantId, req, message) => {
  const endTime = Date.now();
  const timeCost = (endTime - req.startTime) / 1000;

  return type === "info"
    ? logger.info(
        `
        [merchantId: ${merchantId}] 
        [client IP: ${req.clientIp}] 
        [method: ${req.method}] 
        [API url: ${decodeURIComponent(req.originalUrl)}] 
        [message: ${message}] 
        [Time Cost: ${timeCost} s] 
        `
      )
    : logger.error(
        `
        [merchantId: ${merchantId}] 
        [client IP: ${req.clientIp}] 
        [method: ${req.method}] 
        [API url: ${decodeURIComponent(req.originalUrl)}] 
        [message: ${message}] 
        [Time Cost: ${timeCost} s] 
        `
      );
};
exports.writeLog = writeLog;
