import styles from '@styles/Home.module.css'
import Header from '@components/header'
import Footer from '@components/footer'
import { useState } from 'react'

import client from '@components/client'
import dynamic from "next/dynamic"

const NoSSRComponent = dynamic(() => import("@components/article_cover"), {
	ssr: false,
});

export async function getServerSideProps() {
	return {
		props: {
			articles: await client
				.from('articles')
				.select("*")
				.eq('published', true)
				.limit(25)
				.then(e => e.data)
		}
	}
}

export default function Home({ articles }) {
	const [ data, setData ] = useState(articles);

	return (
		<div className={styles.container}>
			<Header title={"Home"} type={"user"}/>
		
			<div className={styles.mainBodyBody}>
				<section className={`${styles.homeSection} ${styles.mainHomeSection}`}>
					<div>
						<h1>Financial <br /> Literacy Youth <br /> NZ</h1>
						<p>Learn better financing with us, wherever you are</p>

						{/* <Button title={"Get Started"} router={Router} onClick={(e, callback) => {
							callback();
						}}></Button> */}
					</div>

					<div className={styles.notOnMobile}>
						<img src={'../plane.png'}></img>
					</div>
				</section>

				<section className={styles.articlesList}>
					{	
						data?.map(e => {
							return (
								<NoSSRComponent key={`K-${e?.id}`} title={e?.title} tags={e?.tags} image={e?.background_image} desc={e?.description} size={0} />
							)
						})
					}
				</section>
			</div>  

			<Footer />  
		</div>
	)
}

