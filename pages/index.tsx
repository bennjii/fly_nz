
import Head from 'next/head'
import Router from 'next/router'

import styles from '@styles/Home.module.css'

import Header from '@components/header'
import Button from '@components/button'
import Footer from '@components/footer'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header title={"Home"}/>
      
      <div className={styles.mainBody}>
        <section className={styles.homeSection}>
          <h1>Fly New Zealand</h1>
          <p>Learn better financing with us, wherever you are</p>

          <Button title={"Get Started"} router={Router} onClick={(e, callback) => {
            callback();
          }}></Button>
        </section>
      </div>  

      <Footer />  
    </div>
  )
}

