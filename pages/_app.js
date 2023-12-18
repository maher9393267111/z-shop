import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import {useState ,useEffect} from 'react'
import '../styles/globals.css'

import { AnimatePresence, motion } from "framer-motion";

import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { StateContextProvider } from '@/functions/context'
import ProgressBar from '../components/common/progressBar'
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function MyApp({ Component, pageProps }) {

    const { route, asPath } = useRouter();


    useEffect(() => {
      if('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
          navigator.serviceWorker.register('/service-worker.js').then(
            function (registration) {
              console.log('Service Worker registration successful with scope: ', registration.scope)
            },
            function (err) {
              console.error('Service Worker registration failed: ', err)
            }
          )
        })
      }
    }, [])



    return (
      <div className=' bg-white dark:bg-slate-800'>

   
        
    <ChakraProvider>
    <StateContextProvider>

    <AnimatePresence
        // mode={'wait'}
          initial={false}
          onExitComplete={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "auto" })
          }
        >

<motion.div
                  // key={route}
                  //   className={' !min-h-[100vh] '}
                  // initial={{ opacity: 1 , x: -200}}
                  // animate={{ opacity: 1 ,x: 0  }}
                  // // exit={{ opacity: 0 ,x: -100 }}
                  // transition={{
                  //   type: 'tween',
                  //   ease: 'linear', 
                  //   duration:0.8,
                  //   delay: 0.1,
                  // }}
                >


    <Component {...pageProps} />

    </motion.div>

</AnimatePresence>

    <ToastContainer />
    <ProgressBar/>
    </StateContextProvider>
    </ChakraProvider>
    </div>

)
}

