
import { Router } from 'next/router'

import styles from '@styles/Home.module.css'

import Article from '@components/article_cover'
import Header from '@components/header'
import Button from '@components/button'
import { useEffect, useState } from 'react'
import supabase from '@components/client'
import Footer from '@components/footer'


export default function Articles({ some_data }) {
  const [ data, setData ] = useState(some_data);

  return (
	<div className={styles.container}>
	  <Header title={"Articles"} type={"user"}/>
	  
		<div className={styles.mainBody}>
			<section className={styles.homeSection + " " + styles.articleMainBody}>
			<h1>Advice</h1>
			<p>Learn better financing with us, wherever you are</p>          
			</section>

		</div>  

		<Footer />  
	</div>
  )
}