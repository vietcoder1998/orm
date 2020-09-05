
import { Logger } from 'tslog';

export const logger: Logger = new Logger();
logger.silly("App running beautifully");
logger.debug("Carefully");
logger.warn("Code must be clean");
logger.error("Check")