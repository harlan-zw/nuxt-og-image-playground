import { defineNuxtModule } from 'nuxt/kit'
import {readFile, writeFile} from "node:fs/promises";
import { globby } from 'globby'

export default defineNuxtModule({
    meta: {
        name: 'fixNetlify',
    },
    setup(config, nuxt) {
        nuxt.hooks.hook('nitro:init', async (nitro) => {
            nitro.hooks.hook('compiled', async (_nitro) => {

                const chunks = await globby([`${_nitro.options.output.serverDir}/chunks/**/*.mjs`], { absolute: true })
                for (const path of [...chunks]) {
                    console.log(path)
                    let contents = (await readFile(path, 'utf-8'))
                    if (path.endsWith('netlify.mjs')) {
                        const match = '// TODO: handle event.isBase64Encoded\n' +
                            '  });'
                        contents = contents.replace(match, `${match}\n
  const headers = normalizeOutgoingHeaders(r.headers);
  // image buffers must be base64 encoded
  if (Buffer.isBuffer(r.body) && headers["content-type"].startsWith("image/")) {
    return {
      statusCode: r.status,
      headers,
      body: r.body.toString("base64"),
      isBase64Encoded: true,
    };
  }`)
                        await writeFile(path, contents, { encoding: 'utf-8' })
                    }

                }
            })
        })
    }
})