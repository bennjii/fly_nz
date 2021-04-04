
import { Router } from 'next/router'

import styles from '@styles/Home.module.css'

import Article from '@components/article_cover'
import Header from '@components/header'
import Button from '@components/button'
import Search from '@components/search'

export default function Stocks() {
  return (
    <div className={styles.container}>
      <Header title={"Stocks"}/>
      
      <body className={styles.mainBody}>
        <Search />
      </body>  
         
    </div>
  )
}