import { motion } from 'framer-motion'

export function PageTransition({ children }) {
    return (
        <motion.div className='page-transition'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    )
}