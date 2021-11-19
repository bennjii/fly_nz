import { useEffect, useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleStyles from '@styles/Article.module.css'

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

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const INDEX: any = context.params.id;
    const ILikeTitle = INDEX ? INDEX.replace(/-/g, " ") : "";

    return {
        props: {
            article_content: await client
                        .from('articles')
                        .select(`
                            title,
                            description,
                            author:author_id ( username, iconURL ),
                            published,
                            content,
                            creation_date,
                            date,
                            background_image,
                            tags
                        `)
                        .ilike('title', `%${ILikeTitle}%`)
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


export default function Home({ article_content }) {
    const [ articleData, setArticleData ] = useState(article_content);
    const [ articleContent, setArticleContent ] = useState<{type: string, content: string, input: boolean}[]>(article_content.content);
    const [ informationUpdated, setInformationUpdated ] = useState(false);

    const router = useRouter();
    const [ time_to_read, setTTR ] = useState(articleContent.flatMap(e => `${e.content} `).join(' ').replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(' ').length / 250);

    return (
        <div className={articleStyles.articleContainer}>
            <Header title={articleData?.title ? articleData?.title : 'create'} type={"user"}/>
            
            <div className={articleStyles.article}>
                <section className={articleStyles.articleHeader}> {/* style={{ backgroundImage: articleData?.background_image && `linear-gradient(180deg, rgba(255,70,70,0) 0%, rgba(55,57,57,1) 100%), url(${articleData?.background_image}` }} */}
                    <div>
                        <div className={articleStyles.articleTags}>
                            <div>COMPOUND INTEREST</div>
                            <p>{ new Date(articleData?.creation_date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})  }</p>
                            
                            <p>{ articleData?.author.username }</p>
                            {/* 250wpm    x words / 250wpm = avg. time */}
                            <div>
                                { 
                                    time_to_read < 1
                                    ? '<1 min read'
                                    : `${Math.round(time_to_read)} min read` 
                                }
                            </div>
                        </div>

                        <h1>{ articleData?.title }</h1>
                        <p>{ articleData?.description }</p>
                    </div>
                </section>

                <section className={articleStyles.articleImage} style={{ backgroundImage: articleData.background_image ? `url(${articleData?.background_image}` : 'linear-gradient(90deg, rgba(170,234,171,1) 0%, rgba(198,215,245,1) 100%)' }}>
                </section>

                <section className={articleStyles.articleBody + " " + articleStyles.articleBodyView}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent, setInformationUpdated }}>
                        {
                            articleContent?.map((element, index) => {
                                return (
                                    <div key={`ARTICLE_${index}`}>
                                        <BuildValue content={[index, element]} callback={setArticleContent} readonly={true} onLeave={() => {}}/>
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
