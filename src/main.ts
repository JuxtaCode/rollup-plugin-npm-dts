import { Generator } from 'npm-dts'
import { Config } from "src/config";
import path from 'path';

async function generateDTS(options: Config): Promise<void> {
  options.entry = options.entry || path.resolve('./src/index.tsx');
  options.output = options.output || path.resolve('./dist/index.d.ts');

  var generator = new Generator(options, true, true);

  generator.generate().catch(function(e) {
    throw e;
  });
}

export default function generate(options: Config): any{
  let ranBefore = false;
  return {
    name: 'generateDTS',
    async writeBundle(): Promise<void> {
      if (ranBefore) return;
      ranBefore = true;
      return generateDTS(options);
    }
  };
}