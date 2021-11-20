import { useEffect, useRef, useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleStyles from '@styles/Article.module.css'

import Header from '@components/header'
import Footer from '@components/footer'
import NewElement from '@components/new_element_arc'

import BuildParent from '@components/build_parent'
import { ClientContext } from '@components/context'

import client from '@components/client'
import { useRouter } from 'next/router'

import { Check, RefreshCw, MoreVertical, Loader } from 'react-feather'
import Button from '@components/button'
import Input from '@components/input'

import _ from 'underscore'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    
    const INDEX = context.params.id;

    return {
        props: {
            some_data: await client
                        .from('articles')
                        .select(`
                            title,
                            description,
                            published,
                            content,
                            creation_date,
                            date,
                            background_image,
                            tags
                        `)
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

export default function Home({ some_data, index }) {
    const [ articleData, setArticleData ] = useState(some_data);
    const [ articleContent, setArticleContent ] = useState<{type: string, content: string, input: boolean}[]>(some_data.content);
    const [ informationUpdated, setInformationUpdated ] = useState(true);

    const [ articleSettingsOverlay, setArticleSettingsOverlay ] = useState(false);

    const router = useRouter();
    const INDEX = index;

    const tag_ref = useRef(null);

    const article_title_ref = useRef(null);
    const article_desc_ref = useRef(null);
    const article_bg_img = useRef(null);

    const [ isSticky, setIsSticky ] = useState(false);

    useEffect(() => {
        const cachedRef = tag_ref.current,
              observer = new IntersectionObserver(
                ([e]) => setIsSticky(e.intersectionRatio < 1),
                {threshold: [1]}
              )
    
        observer.observe(cachedRef)
        
        // unmount
        return function(){
          observer.unobserve(cachedRef)
        }
    }, [])

    useEffect(() => {
        if(!articleData) return;
        
        const filteredData = articleContent?.filter(e => e.content.trim() !== '');
        // if(JSON.stringify(articleContent) !== JSON.stringify(filteredData)) setArticleContent(filteredData);

        if(JSON.stringify(articleData) !== JSON.stringify({ ...articleData, content: filteredData })) {
            setInformationUpdated(false);

            debounceStorageUpdate({ ...articleData, content: filteredData }, INDEX, (e) => {
                if(!e.error) setInformationUpdated(true);
            });
        }
    }, [articleContent]);

    return (
        <div className={articleStyles.articleContainer}>
            <Header title={articleData?.title ? articleData?.title : 'create'} type={"admin"}/>

            {/* <div className={articleStyles.stickyHeader} style={{ display: showTempHeader ? 'flex' : 'none' }}>
                <div className={articleStyles.articleTags}>
                    <h4>{ articleData?.title }</h4>

                    <div className={styles.headerTitleAid} style={{ padding: 0 }}>
                        <div onClick={() => {
                            setArticleSettingsOverlay(!articleSettingsOverlay);
                        }}>
                            <MoreVertical size={18} color={"#0f0f0f"} />
                        </div>

                        {
                            informationUpdated ?
                            <div className={articleStyles.articleSynced} >
                                Synced&nbsp;
                                <Check size={18} />
                            </div>
                            :
                            <div className={articleStyles.articleSyncing}>
                                Syncing
                                <Loader size={18} />
                            </div>
                        }
                    </div>
                </div>
            </div> */}
            
            <div className={articleStyles.article}>
                {
                    articleSettingsOverlay ?
                    <div className={styles.settingsOverlay} onClick={(e) => {
                        //@ts-expect-error
                        if(e.target.classList.contains(styles.settingsOverlay)) {
                            setArticleSettingsOverlay(false);

                            debounceStorageUpdate({ ...articleData, published: !articleData?.published }, INDEX, (e) => {
                                setArticleData(e.data[0]);
                                setInformationUpdated(true);
                            });

                            debounceStorageUpdate({ ...articleData, title: article_title_ref.current.value }, INDEX, (e) => {
                                setArticleData(e.data[0]);
                                setInformationUpdated(true)
                            });

                            debounceStorageUpdate({ ...articleData, description: article_desc_ref.current.value }, INDEX, (e) => {
                                setArticleData(e.data[0]);
                                setInformationUpdated(true)
                            });

                            debounceStorageUpdate({ ...articleData, background_image: article_bg_img.current.value }, INDEX, (e) => {
                                setArticleData(e.data[0]);
                                setInformationUpdated(true)
                            });
                        }
                    }}>
                        <div>
                            <h1>Settings</h1>

                            <div>
                                <h3>Article Visibility</h3> <p>{articleData?.published ? "Published" : "Draft"}</p>
                            </div>

                            <Button title={articleData?.published ? "Redact" : "Publish"} onClick={(e, callback) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate({ ...articleData, published: !articleData?.published }, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true);
                                    callback();
                                });
                            }}></Button>

                            <hr />

                            <div>
                                <h3>Title</h3> <p>{articleData?.title}</p>
                            </div>

                            <Input type={"text"} ref={article_title_ref} placeholder={"Article Title"} defaultValue={articleData?.title} onKeyDown={(e) => {
                                if(e.code == "Enter") {
                                    setInformationUpdated(false);

                                    debounceStorageUpdate({ ...articleData, title: e.target.value }, INDEX, (e) => {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true)
                                    });
                                }                           
                            }} onBlur={(e) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate({ ...articleData, title: e.target.value }, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                });
                            }} />

                            <hr />

                            <div>
                                <h3>Description</h3> <p>{articleData?.description}</p>
                            </div>

                            <Input type={"text"} ref={article_desc_ref} placeholder={"Article Description"} defaultValue={articleData?.description} onKeyDown={(e) => {
                                if(e.code == "Enter") {
                                    setInformationUpdated(false);

                                    debounceStorageUpdate({ ...articleData, description: e.target.value }, INDEX, (e) => {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true)
                                    });
                                } 
                            }} onBlur={(e) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate({ ...articleData, description: e.target.value }, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                });
                            }} />

                            <hr />

                            <div>
                                <h3>Sync Status</h3> <p>{informationUpdated ? "Synced" : "Syncing"}</p>
                            </div>

                            <Button title={"Force Sync"} onClick={(e, callback) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate(articleData, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true);
                                    callback();
                                });
                            }}></Button>

                            <hr />

                            <div>
                                <h3>Background Image</h3> <p>{articleData?.background_image ? articleData?.background_image : "No Image"}</p>
                            </div>

                            <Input type={"text"} ref={article_bg_img} placeholder={"Image URL"} defaultValue={articleData?.background_image} onKeyDown={(e) => {
                                if(e.code == "Enter") {
                                    setInformationUpdated(false);

                                    debounceStorageUpdate({ ...articleData, background_image: e.target.value }, INDEX, (e) => {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true)
                                    });
                                } 
                            }} onBlur={(e) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate({ ...articleData, background_image: e.target.value }, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                });
                            }} />
                        </div>
                    </div>
                    :
                    <></>
                }

                <section className={articleStyles.articleHeader}> {/* style={{ backgroundImage: articleData?.background_image && `linear-gradient(180deg, rgba(255,70,70,0) 0%, rgba(55,57,57,1) 100%), url(${articleData?.background_image}` }} */}
                    <div>
                        <div className={articleStyles.articleTags} style={{ position: 'sticky' }} ref={tag_ref}>
                            {
                                isSticky ? 
                                <h4>{ articleData?.title }</h4>
                                :
                                <div>COMPOUND INTEREST</div>
                            }
                            
                            {
                                !isSticky ?
                                    <p>{ new Date(articleData?.creation_date).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})  }</p>
                                :
                                    <></>
                            }
                            
                            {/* <p>{ articleData?.author?.username }</p> */}
                            {/* 250wpm    x words / 250wpm = avg. time */}

                            <div className={styles.headerTitleAid} style={{ padding: 0 }}>
                                <div onClick={() => {
                                    setArticleSettingsOverlay(!articleSettingsOverlay);
                                }}>
                                    <MoreVertical size={18} color={"#0f0f0f"} />
                                </div>

                                {
                                    informationUpdated ?
                                    <div className={articleStyles.articleSynced} >
                                        Synced&nbsp;
                                        <Check size={18} />
                                    </div>
                                    :
                                    <div className={articleStyles.articleSyncing}>
                                        Syncing
                                        <Loader size={18} />
                                    </div>
                                }
                            </div>
                        </div>

                        <h1 contentEditable onBlur={(e) => {
                            setInformationUpdated(false);

                            debounceStorageUpdate({ ...articleData, title: e.target.innerHTML }, INDEX, (e) => {
                                setArticleData(e.data[0]);
                                setInformationUpdated(true)
                            });

                        }}>{ articleData?.title }</h1>
                        <p contentEditable onBlur={(e) => {
                            setInformationUpdated(false);

                            debounceStorageUpdate({ ...articleData, description: e.target.innerHTML }, INDEX, (e) => {
                                setArticleData(e.data[0]);
                                setInformationUpdated(true)
                            });

                        }}>{ articleData?.description }</p>
                    </div>
                </section>

                <section className={articleStyles.articleImage} style={{ backgroundImage: articleData.background_image ? `url(${articleData?.background_image}` : 'linear-gradient(90deg, rgba(170,234,171,1) 0%, rgba(198,215,245,1) 100%)' }}>
                </section>

                <section className={articleStyles.articleBody}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent, setInformationUpdated }}>
                        <NewElement index={0} callmap={articleContent} callback={setArticleContent}/>
                        {
                            articleContent?.map((element, index) => {
                                return (
                                    <div key={`ELEMENT-${index}`}>
                                        <BuildParent content={[index, element]} callback={setArticleContent} />

                                        <NewElement index={index+1} callmap={articleContent} callback={setArticleContent} />
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

const debounceStorageUpdate = debounce((data, info, callback) => {
    client
        .from('articles')
        .update({
            ...data,
            date: new Date()
        })
        .eq('id', info)
        .then(e => {
            if(!e.error) callback(e)
        });
});

function debounce(func, timeout = 1000){
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}