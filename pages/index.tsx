
import Head from 'next/head'
import styles from '@styles/Home.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next TypeScript App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <div>
          <div className={styles.headerIcon}>
            <FontAwesomeIcon icon={faPaperPlane} /> 

            <h3>
              fly
            </h3> 
          </div>

          <div className={styles.headerLinks}>
            <a href="">Articles</a>
            <a href="">Advice</a>
          </div>  
        </div>
      </div>
      
      <body className={styles.mainBody}>
        
      </body>
         
    </div>
  )
}
