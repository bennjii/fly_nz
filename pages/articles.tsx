import styles from '@styles/Home.module.css'
import Article from '@components/article_cover'
import Header from '@components/header'
import { useState } from 'react'
import supabase from '@components/client'
import Footer from '@components/footer'

export async function getServerSideProps() {
	return {
		props: {
			some_data: await supabase
						.from('articles')
						.select('*')
						.eq('published', true)
						.limit(25)
						.then(e => e.data)
		}
	}
}

export default function Articles({ some_data }) {
  const [ data, setData ] = useState(some_data);

  return (
	<div className={styles.container}>
	  	<Header title={"Articles"} type={"user"}/>
	  
		<div className={styles.mainBody}>
			<section className={styles.homeSection + " " + styles.articleMainBody}>
			<h1>Articles</h1>
			<p>Learn better financing with us, wherever you are</p>          
			</section>

			<section className={styles.articles}>
				{/* <Article title={"Saving Money"} tags={[{title: "Finance", color: {background: '124, 180, 239', foreground: '124, 180, 239'}}]} image={"https://www.techicy.com/wp-content/uploads/2018/12/How-could-you-save-money.jpg"} desc={"The importance and benefits of saving money and the different methods of doing so."} size={1} redirect={"12haca"}/> */}
				
				{
				data?.map(e => {
					return (
						<Article key={`ARTi-${e.id}`} title={e.title} tags={e.tags} image={e.background_image} desc={e.description} size={window.matchMedia("only screen and (max-width: 760px)").matches ? 0 : 1} />
					)
				})
				}
			</section>
		</div>  

		<Footer />  
	</div>
  )
}