import styles from '@styles/Home.module.css'
import Header from '@components/header'
import Footer from '@components/footer'
import { useState } from 'react'

import client from '@components/client'
import dynamic from "next/dynamic"
import Button from '@components/button'
import { useRouter } from 'next/router'
import { ArrowRight } from 'react-feather'

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

	const Router = useRouter();

	return (
		<div className={styles.container}>
			<Header title={"FlyNZ"} type={"user"}/>
		
			<div className={styles.mainBodyBody}>
				<section className={`${styles.homeSection} ${styles.mainHomeSection}`}>
					<div>
						<div>
							<h2>Building <strong>strong</strong> financial skills</h2>
							<p>Financial Literacy Youth New Zealand</p>
						</div>

						<div>
							{/* <Button title={"Learn More"} router={Router} onClick={(e, callback) => {
								callback();
							}}></Button> */}

							<div className={styles.tempButton} onClick={() => {
								Router.push('./articles')
							}}>
								<p>Learn More</p>
								<ArrowRight strokeWidth={2} size={18} />
							</div>
							{/* <a>Learn More</a> */}
						</div>
						
					</div>

					{/* <div className={styles.notOnMobile}>
						<img src={'../plane.png'}></img>
					</div> */}
				</section>

				<section className={styles.articlesList}>
					{	
						data?.map(e => {
							return (
								<NoSSRComponent key={`K-${e?.id}`} title={e?.title} type={1} tags={[ e?.category ]} image={e?.background_image} desc={e?.description} size={0} />
							)
						})
					}
				</section>
			</div>  

			<Footer />  
		</div>
	)
}

