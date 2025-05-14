import winston from "winston";
import chalk from "chalk";

const colorLevel = (level) =>{
  if(level == 'INFO') return chalk.greenBright(level)
  else if(level == 'DEBUG') return chalk.blueBright(level)
  else if(level == 'WARN') return chalk.yellowBright(level)
  else if(level == 'ERROR') return chalk.redBright(level)
  else return level
};

const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({level,message, timestamp, tag}) => {
    tag = tag || "SYSTEM";
    const levelUpperCase = level.toLocaleUpperCase();
    const levelColor = colorLevel(levelUpperCase)
    return `${timestamp}\t${levelColor}\t${tag}\t${message}`
  })
);

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { tag: "SYSTEM" },
  // Nơi thiết lập log đến file, console
  transports: [
    // thiết lập cho log ở terminal
    new winston.transports.Console({ format: consoleFormat }),

    // chỉ ghi log là error
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // ghi tất cả log vào file combine
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;
