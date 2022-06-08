import { IpynbRenderer } from "react-ipynb-renderer";
import { useEffect, useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleStyles from '@styles/Article.module.css'

import Header from '@components/header'
import Footer from '@components/footer'
import NewElement from '@components/new_element_arc'

import 'katex/dist/katex.min.css';
import "react-ipynb-renderer/dist/styles/grade3.css";

import BuildParent from '@components/build_parent'
import { ClientContext } from '@components/context'

import client from '@components/client'
import { useRouter } from 'next/router'

import _ from 'underscore'
import BuildValue from '@components/build_value'
import { StickyContainer, Sticky } from 'react-sticky';
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const INDEX: any = context.params.id;
    const ILikeTitle = INDEX ? INDEX.replace(/-/g, " ") : "";

    return {
        props: {
            article_content: await client
                        .from('ml')
                        .select(`
                            title,
                            description,
                            author:author_id ( username, iconURL ),
                            published,
                            content,
                            created_at,
                            category
                        `)
                        .ilike('title', `%${ILikeTitle}%`)
                        .then(e => {
                            console.log(e);
                            if(e.data) {
                                return { 
                                        ...e.data[0]
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

    // console.log(article_content);

    const router = useRouter();
    const [ time_to_read, setTTR ] = useState(JSON.stringify(article_content.content).replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(' ').length / 100);
    const ipynb = article_content.content;

    return (
        <div className={articleStyles.articleContainer}>
            <Header title={articleData?.title ? articleData?.title : 'create'} type={"user"}/>
            
            <StickyContainer className={articleStyles.article}>
                <Sticky>
                    {({
                        isSticky,
                        style
                    }) => (
                        <div className={`${articleStyles.articleTags} ${isSticky ? articleStyles.articleStickyHeader : " "}`} style={style}>
                            <div className={isSticky ? articleStyles.articleTagsSticky : articleStyles.nothingInteresting}>
                                {
                                    !isSticky ? <></>
                                    : <h4>{ articleData?.title }</h4>
                                }
                                
                                <p>{ new Date(articleData?.created_at).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})  }</p>
                                
                                {
                                    !isSticky ? <p>{ articleData?.author.username }</p>
                                    : <></>
                                }
                                
                                {/* 250wpm    x words / 250wpm = avg. time */}
                                <div>
                                    { 
                                        time_to_read < 1
                                        ? '<1 min read'
                                        : `${Math.round(time_to_read)} min read` 
                                    }
                                </div>
                            </div>
                        </div>
                        
                    )}
                </Sticky>
            
                <section className={articleStyles.articleHeader}> {/* style={{ backgroundImage: articleData?.background_image && `linear-gradient(180deg, rgba(255,70,70,0) 0%, rgba(55,57,57,1) 100%), url(${articleData?.background_image}` }} */}
                    <div>
                        <h1>{ articleData?.title }</h1>
                        <p>{ articleData?.description }</p>
                    </div>
                </section>

                <section className={articleStyles.articleImage} style={{ backgroundImage: articleData.background_image ? `url(${articleData?.background_image}` : 'linear-gradient(90deg, rgba(170,234,171,1) 0%, rgba(198,215,245,1) 100%)' }}>
                </section>

                <section className={articleStyles.articleBody} style={{ fontFamily: 'monospace !important' }}>
                    <IpynbRenderer
                        ipynb={ipynb}
                        syntaxTheme="ghcolors"
                        language="python"
                        bgTransparent={false}
                        formulaOptions={{ // optional
                            renderer: "mathjax", // katex by default
                            katex: {
                            delimiters: "gitlab", // dollars by default
                                katexOptions: {
                                    fleqn: false,
                                },
                            }
                        }}
                        />
                </section>
            </StickyContainer>  

            <Footer />  
        </div>
    )
}