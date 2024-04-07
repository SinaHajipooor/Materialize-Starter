
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';


// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'
import { ToastContainer } from 'react-toastify';

// ** Config Imports

import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'


// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import WindowWrapper from 'src/@core/components/window-wrapper'


// ** Contexts
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.css'
import queryClientSetup from 'src/utils/reactQuery/querySetup'
import NextAuthProvider from 'src/context/NextAuthProvider'


// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
    Component: NextPage
    emotionCache: EmotionCache
}



const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
    Router.events.on('routeChangeStart', () => {
        NProgress.start()
    })
    Router.events.on('routeChangeError', () => {
        NProgress.done()
    })
    Router.events.on('routeChangeComplete', () => {
        NProgress.done()
    })
}



// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    // Variables
    const contentHeightFixed = Component.contentHeightFixed ?? false
    const getLayout =
        Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
    const setConfig = Component.setConfig ?? undefined


    return (
        <NextAuthProvider>
            <QueryClientProvider client={queryClientSetup}>
                <CacheProvider value={emotionCache}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Head>
                        <title>
                            سامانه آزمایشی
                        </title>
                        <meta
                            name='TEST'
                            content={`سامانه آزمایشی`}
                        />
                        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
                        <meta name='viewport' content='initial-scale=1, width=device-width' />
                    </Head>
                    <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
                        <SettingsConsumer>
                            {({ settings }) => {
                                return (
                                    <ThemeComponent settings={settings}>
                                        <WindowWrapper>
                                            {getLayout(<Component {...pageProps} />)}
                                        </WindowWrapper>

                                        <ToastContainer
                                            theme='colored'
                                            autoClose={1500}
                                            toastStyle={{
                                                direction: 'rtl',
                                                fontFamily: 'inherit',
                                            }}
                                            position='top-left'
                                        />
                                    </ThemeComponent>
                                )
                            }}
                        </SettingsConsumer>
                    </SettingsProvider>
                </CacheProvider>
            </QueryClientProvider>
        </NextAuthProvider >
    )
}

export default App
