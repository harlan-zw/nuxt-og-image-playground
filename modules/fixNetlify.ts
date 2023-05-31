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
                        contents = contents.replace('body: r.body.toString()', 'body: r.body.toString(\'base64\'),\n' +
                            '    isBase64Encoded: true')
                        await writeFile(path, contents, { encoding: 'utf-8' })
                    }

                }
            })
        })
    }
})
