import styles from '@styles/Home.module.css'
import Header from '@components/header'
import { useState } from 'react'
import Footer from '@components/footer'

export default function Articles({ some_data }) {
  const [ data, setData ] = useState(some_data);

  return (
	<div className={styles.container}>
	  <Header title={"ML"} type={"user"}/>
	  
		<div className={styles.mainBody}>
			<section className={styles.homeSection + " " + styles.articleMainBody}>
			<h1>Financial Modeling</h1>
			<p>Jyupter Notebook</p>          
			</section>

		</div>  

		<Footer />  
	</div>
  )
}