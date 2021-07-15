
import { Router } from 'next/router'

import styles from '@styles/Home.module.css'

import Article from '@components/article_cover'
import Header from '@components/header'
import Button from '@components/button'
import { useEffect, useState } from 'react'
import supabase from '@components/client'

export default function Articles() {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    supabase
      .from('articles')
      .select()
      .eq('published', true)
      .limit(25)
      .then(e => {
        setData(e.data)
      });
  }, []);

  return (
    <div className={styles.container}>
      <Header title={"Articles"} type={"user"}/>
      
      <body className={styles.mainBody}>
        <section className={styles.homeSection}>
          <h1>Articles</h1>
          <p>Learn better financing with us, wherever you are</p>          
        </section>

        <section className={styles.articles}>
            {/* <Article title={"Saving Money"} tags={[{title: "Finance", color: {background: '124, 180, 239', foreground: '124, 180, 239'}}]} image={"https://www.techicy.com/wp-content/uploads/2018/12/How-could-you-save-money.jpg"} desc={"The importance and benefits of saving money and the different methods of doing so."} size={1} redirect={"12haca"}/> */}
            
            {
              data?.map(e => {
                return (
                  <Article title={e.title} tags={e.tags} image={e.image} desc={e.description} size={1} redirect={e.id} />
                )
              })
            }
        </section>
      </body>  
         
    </div>
  )
}