// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

class CustomDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='apple-touch-icon' sizes='180x180' href='/images/apple-touch-icon.png' />
                    <link rel='shortcut icon' href='/images/Logo.png' sizes='80px' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Medium.ttf' as='font' crossOrigin='anonymous' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Medium.ttf' as='font' crossOrigin='anonymous' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Bold.ttf' as='font' crossOrigin='anonymous' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Black.ttf' as='font' crossOrigin='anonymous' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Heavy.ttf' as='font' crossOrigin='anonymous' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Light.ttf' as='font' crossOrigin='anonymous' />
                    <link href='/fonts/iransans-pro/IRANSansXFaNum-Thin.ttf' as='font' crossOrigin='anonymous' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

CustomDocument.getInitialProps = async ctx => {
    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props =>
            (
                <App
                    {...props} // @ts-ignore
                    emotionCache={cache}
                />
            )
        })

    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => {
        return (
            <style
                key={style.key}
                dangerouslySetInnerHTML={{ __html: style.css }}
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
            />
        )
    })

    return {
        ...initialProps,
        styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
    }
}

export default CustomDocument
