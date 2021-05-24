import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

export default function Page({ children, title = 'Cygni Hemuppgift' }) {
  return <>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <motion.main
      initial={{
        opacity: 0,
        y: 50
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: -200,
        transition: {
          bounce: 0
        }
      }}
    >
      {children}
    </motion.main>
  </>
}