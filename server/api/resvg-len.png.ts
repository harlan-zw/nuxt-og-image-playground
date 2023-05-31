import { defineEventHandler, setHeader, sendStream } from 'h3'
import { Resvg } from '@resvg/resvg-js'

export default defineEventHandler(async (e) => {
    const resvgJS = new Resvg('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><linearGradient gradientTransform="rotate(150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="hsl(315, 100%, 72%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(227, 100%, 50%)" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n' +
        '  <feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>\n' +
        '  <feGaussianBlur stdDeviation="20 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>\n' +
        '  <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>\n' +
        '  \n' +
        '</filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect></svg>', {
        logLevel: 'trace',
        fitTo: {
            mode: 'width',
            value: 1200,
        },
    })
    const pngData = resvgJS.render()
    const png = pngData.asPng()
    console.log('buffer len', png.length)
    setHeader(e, 'Content-Type', 'image/png')
    // add size header
    setHeader(e, 'Content-Length', png.length)
    // we return png back to a buffer
    return e.node.res.end(png);
})
