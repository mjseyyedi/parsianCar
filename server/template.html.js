import {Helmet} from 'react-helmet'

export default (content, extractor, state) => {
  const helmet = Helmet.renderStatic()
  return `
  <!DOCTYPE html>
    <html dir="rtl" lang="fa">
    <head>
      ${title}
      ${meta}
      ${link}
      ${extractor.getLinkTags()}
      ${extractor.getStyleTags()}
      ${noscript}
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.style.toString()}
      ${helmet.script.toString()}
      ${helmet.noscript.toString()}
      <link rel="manifest" href="/manifest.json"/>
    </head>
    <body>
      <div id="app">${content}</div>
      <div id="toaster"></div>
      <div id="modal-root"></div>
      <script>
        window.__STATE__ = ${JSON.stringify(state)}
      </script>
      ${extractor.getScriptTags()}         
    </body>
    </html>
  `
}

// const googleTag = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WMR86GC')</script>`

const title = `<title>سفارش آنلاین خودروهای تشریفاتی | تشریفات پارسی</title>`

const meta = `
  <meta http-equiv="Content-Type" content="text/html;" charset="utf-8" />
  <meta name="theme-color" content="#2F2D38" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <meta name="keywords" content="سفارش آنلاین خودروهای تشریفاتی، bmw ، بنز ، بی ام و ، پورشه ، کبریون ، مازراتی" />
  <meta name="description" content="تشریفات پارسی یک پلتفرم آنلاین سفارش خودروهای تشریفاتی، به صورت روزانه و ماهانه است" />
  <meta http-equiv="Accept-CH" content="DPR,Viewport-Width,Width" />
  <meta http-equiv="Cache-Control" content="no-store" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="parsicar" content="parsicar" />
`

const link = `
  <link rel="icon" href="./images/favicon.ico" />
`

const noscript = `<noscript>Please enable javascript.</noscript>`
