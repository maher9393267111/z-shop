import { ChakraProvider } from '@chakra-ui/react'
//import '../styles/globals.css'
import '../input.css'
import { AnimatePresence, motion } from "framer-motion";

import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { StateContextProvider } from '@/functions/context'

export default function MyApp({ Component, pageProps }) {

    return (
        
    <ChakraProvider>
    <StateContextProvider>
    
    <Component {...pageProps} />
    <ToastContainer />
    </StateContextProvider>
    </ChakraProvider>

)
}