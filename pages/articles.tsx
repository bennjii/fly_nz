import styles from '@styles/Home.module.css'
import Article from '@components/article_cover'
import Header from '@components/header'
import { useState } from 'react'
import supabase from '@components/client'
import Footer from '@components/footer'
import dynamic from "next/dynamic"

const NoSSRComponent = dynamic(() => import("@components/article_cover"), {
	ssr: false,
});

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

			<section className={styles.articlesList}>
				{	
					data?.map(e => {
						return (
							<NoSSRComponent key={`K-${e?.id}`} type={1} title={e?.title} tags={[ e?.category ]} image={e?.background_image} desc={e?.description} size={0} />
						)
					})
				}
			</section>
		</div>  

		<Footer />  
	</div>
  )
}