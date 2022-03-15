import styles from '@styles/Home.module.css'
import Header from '@components/header'
import { useState } from 'react'
import Footer from '@components/footer'
import dynamic from "next/dynamic"
import supabase from '@components/client'

const NoSSRComponent = dynamic(() => import("@components/article_cover"), {
	ssr: false,
});

export async function getServerSideProps() {
	return {
		props: {
			some_data: await supabase
						.from('ml')
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
	  <Header title={"ML"} type={"user"}/>
	  
		<div className={styles.mainBody}>
			<section className={styles.homeSection + " " + styles.articleMainBody}>
				<h1>Financial Modeling</h1>
				<p>Jyupter Notebook</p>          
			</section>

			<section className={styles.articlesList}>
				{	
					data?.map(e => {
						return (
							<NoSSRComponent key={`K-${e?.id}`} title={e?.title} type={0} image={null} tags={[ e?.category ]} desc={e?.description} size={1} />
						)
					})
				}
			</section>
		</div>  

		<Footer />  
	</div>
  )
}