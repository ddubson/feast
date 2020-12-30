import {createLogger, format, transports} from "winston";

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.simple(),
    format.colorize()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: 'feast-api-error.log', level: 'error' }),
    new transports.File({ filename: 'feast-api.log' })
  ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

export default logger;
