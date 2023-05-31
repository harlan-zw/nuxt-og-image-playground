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
  console.log(typeof r.body, r.headers["content-type"])
  const contentType = r.headers["content-type"] || r.headers['Content-Type']
  // must send jpg / png as base 64 encoded
  if (["image/png", "image/jpeg"].includes(contentType)) {
    return {
      statusCode: r.status,
      headers: normalizeOutgoingHeaders(r.headers),
      body: r.body.toString("base64"),
      isBase64Encoded: true
    };
  }`)
                        await writeFile(path, contents, { encoding: 'utf-8' })
                    }

                }
            })
        })
    }
})
