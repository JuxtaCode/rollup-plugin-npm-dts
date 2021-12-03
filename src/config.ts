import { INpmDtsArgs } from 'npm-dts/lib/cli';
import { ELogLevel } from 'npm-dts/lib/log';

export { ELogLevel } from 'npm-dts/lib/log';

/**
 * The parameters to this plugin
 * @public
 */
export interface Config extends INpmDtsArgs {
  entry: string,
  root: string,
  tmp: string,
  tsc: string,
  force: boolean,
  logLevel: ELogLevel
}
