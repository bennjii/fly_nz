import { useEffect, useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleSyles from '@styles/Article.module.css'

import Header from '@components/header'
import Footer from '@components/footer'
import NewElement from '@components/new_element_arc'

import BuildParent from '@components/build_parent'
import { ClientContext } from '@components/context'

import client from '@components/client'
import { useRouter } from 'next/router'

import { Check, RefreshCw, MoreVertical } from 'react-feather'
import Button from '@components/button'
import Input from '@components/input'

import _ from 'underscore'
import BuildValue from '@components/build_value'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

// export const getStaticPaths: GetStaticPaths = async (a) => {
//     const articles = await client
//         .from('articles')
//         .select('id')
//         .eq('published', true)
//         .then(e => e.data)

//     const paths = articles?.map((article) => ({
//         params: { id: article.id.toString() },
//     }))

//     return {
//         paths: paths, //indicates that no page needs be created at build time
//         fallback: 'blocking' //indicates the type of fallback
//     }
// }

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const INDEX = context.params.id;

    return {
        props: {
            some_data: await client
                        .from('articles')
                        .select()
                        .eq('id', INDEX)
                        .then(e => {
                            if(e.data) {
                                return { 
                                        ...e.data[0], 
                                        content: 
                                            ( e.data[0].content == [] ? 
                                                [{ type: "p", content: 'START WRITING HERE', input: false}] 
                                                : 
                                                e.data[0].content
                                            ) 
                                    }
                            }
                        }),
            index: INDEX
        }
    }
  }


export default function Home({ some_data }) {
    const [ articleData, setArticleData ] = useState(some_data);
    const [ articleContent, setArticleContent ] = useState<{type: string, content: string, input: boolean}[]>(some_data.content);
    const [ informationUpdated, setInformationUpdated ] = useState(false);

    const router = useRouter();

    return (
        <div className={styles.container}>
            <Header title={articleData?.title ? articleData?.title : 'create'} type={"user"}/>
            
            <div className={articleSyles.article}>
                <section className={articleSyles.articleHeader} style={{ backgroundImage: articleData?.background_image && `linear-gradient(180deg, rgba(255,70,70,0) 0%, rgba(55,57,57,1) 100%), url(${articleData?.background_image}` }}>
                    <div>
                        <h1>{ articleData?.title }</h1>
                    </div>
                </section>

                <section className={articleSyles.articleBody + " " + articleSyles.articleBodyView}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent, setInformationUpdated }}>
                        {
                            articleContent?.map((element, index) => {
                                return (
                                    <div key={`ARTICLE_${index}`}>
                                        <BuildValue content={[index, element]} callback={setArticleContent} readonly={true}/>
                                    </div>
                                )
                            })
                        }
                    </ClientContext.Provider>

                    
                </section>
            </div>  

            <Footer />  
        </div>
    )
}
