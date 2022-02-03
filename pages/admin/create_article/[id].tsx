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

import { Check, RefreshCw, MoreVertical, Loader, X } from 'react-feather'
import Button from '@components/button'
import Input from '@components/input'

import { StickyContainer, Sticky } from 'react-sticky';
import _ from 'underscore'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import BuildValue from '@components/build_value'

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
                            category,
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
    const [ syncFailed, setSyncFailed ] = useState(false);

    const [ articleSettingsOverlay, setArticleSettingsOverlay ] = useState(false);

    const router = useRouter();
    const INDEX = index;

    const article_bg_img = useRef(null);
    const article_category = useRef(null);

    useEffect(() => {
        if(!articleData) return;
        
        // const filteredData = articleContent?.filter(e => e.content.trim() !== '');
        // // if(JSON.stringify(articleContent) !== JSON.stringify(filteredData)) setArticleContent(filteredData);

        setInformationUpdated(false);

        debounceStorageUpdate({ ...articleData, content: articleContent }, INDEX, (e) => {
            if(e.error) {
                setSyncFailed(true);
                return;
            }else {
                setInformationUpdated(true)
            }

            console.log(e);
        });
    }, [articleContent]);

    return (
        <div className={articleStyles.articleContainer}>
            <Header title={articleData?.title ? articleData?.title : 'create'} type={"admin"}/>
            
            <StickyContainer className={articleStyles.article}>
                {
                    articleSettingsOverlay ?
                    <div className={styles.settingsOverlay} onClick={(e) => {
                        //@ts-expect-error
                        if(e.target.classList.contains(styles.settingsOverlay)) {
                            setArticleSettingsOverlay(false);

                            debounceStorageUpdate({ ...articleData, published: !articleData?.published }, INDEX, (e) => {
                                if(e.error) {
                                    setSyncFailed(true);
                                    return;
                                }else {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                }
                            });

                            debounceStorageUpdate({ ...articleData, background_image: article_bg_img.current.value }, INDEX, (e) => {
                                if(e.error) {
                                    setSyncFailed(true);
                                    return;
                                }else {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                }
                            });

                            debounceStorageUpdate({ ...articleData, category: article_category.current.value }, INDEX, (e) => {
                                if(e.error) {
                                    setSyncFailed(true);
                                    return;
                                }else {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                }
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
                                    if(e.error) {
                                        setSyncFailed(true);
                                        return;
                                    }else {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true);
                                        callback();
                                    }
                                });
                            }}></Button>

                            <br />

                            <div>
                                <h3>Sync Status</h3> <p>{informationUpdated ? "Synced" : syncFailed ? "Failed" : "Syncing"}</p>
                            </div>

                            <Button title={"Force Sync"} onClick={(e, callback) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate(articleData, INDEX, (e) => {
                                    if(e.error) {
                                        setSyncFailed(true);
                                        callback();
                                        return;
                                    }else {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true);
                                        callback();
                                    }
                                });
                            }}></Button>

                            <br />

                            <div>
                                <h3>Background Image</h3> <p>{articleData?.background_image ? articleData?.background_image : "No Image"}</p>
                            </div>

                            <Input type={"text"} ref={article_bg_img} placeholder={"Image URL"} defaultValue={articleData?.background_image} onKeyDown={(e) => {
                                if(e.code == "Enter") {
                                    setInformationUpdated(false);

                                    debounceStorageUpdate({ ...articleData, background_image: e.target.value }, INDEX, (e) => {
                                        if(e.error) {
                                            setSyncFailed(true);
                                            return;
                                        }else {
                                            setArticleData(e.data[0]);
                                            setInformationUpdated(true);
                                        }
                                    });
                                } 
                            }} onBlur={(e) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate({ ...articleData, background_image: e.target.value }, INDEX, (e) => {
                                    if(e.error) {
                                        setSyncFailed(true);
                                        return;
                                    }else {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true);
                                    }
                                });
                            }} />

                            <br />

                            <div>
                                <h3>Category</h3> <p>{articleData?.category}</p>
                            </div>

                            <Input type={"text"} ref={article_category} defaultValue={articleData?.category} onKeyDown={(e) => {
                                if(e.code == "Enter") {
                                    setInformationUpdated(false);

                                    debounceStorageUpdate({ ...articleData, category: e.target.value }, INDEX, (e) => {
                                        if(e.error) {
                                            setSyncFailed(true);
                                            return;
                                        }else {
                                            setArticleData(e.data[0]);
                                            setInformationUpdated(true);
                                        }
                                    });
                                } 
                            }} onBlur={(e) => {
                                setInformationUpdated(false);

                                debounceStorageUpdate({ ...articleData, category: e.target.value }, INDEX, (e) => {
                                    if(e.error) {
                                        setSyncFailed(true);
                                        return;
                                    }else {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true);
                                    }
                                });
                            }} />

                            <br />

                            <div>
                                <h3>Publish Date</h3> <p>{articleData?.publishDate}</p>
                            </div>

                            <input type="date" style={{ width: 'fit-content' }} defaultValue={articleData?.publishDate}></input>
                        </div>
                    </div>
                    :
                    <></>
                }

                <Sticky >
                    {({
                        isSticky,
                        style
                    }) => (
                        <div className={articleStyles.articleTags} style={style}>
                            <div >
                                {
                                    isSticky ? 
                                    <h4>{ articleData?.title }</h4>
                                    :
                                    <div>{ articleData?.category?.toUpperCase() }</div>
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
                                        syncFailed ? 
                                        <div className={articleStyles.articleFailed}>
                                            Failed
                                            <X size={18} />
                                        </div>
                                        :
                                        <div className={articleStyles.articleSyncing}>
                                            Syncing
                                            <Loader size={18} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        
                    )}
                </Sticky>

                <section className={articleStyles.articleHeader}> {/* style={{ backgroundImage: articleData?.background_image && `linear-gradient(180deg, rgba(255,70,70,0) 0%, rgba(55,57,57,1) 100%), url(${articleData?.background_image}` }} */}
                    <div>
                        <h1 contentEditable onBlur={(e) => {
                            setInformationUpdated(false);

                            debounceStorageUpdate({ ...articleData, title: e.target.innerText }, INDEX, (e) => {
                                if(e.error) {
                                    setSyncFailed(true);
                                    return;
                                }else {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                }
                            });

                        }}>{ articleData?.title }</h1>  {/* MAKE THESE INPUTS NO CONTENTEDITABLE */}
                        <p contentEditable onBlur={(e) => {
                            setInformationUpdated(false);

                            debounceStorageUpdate({ ...articleData, description: e.target.innerText }, INDEX, (e) => {
                                if(e.error) {
                                    setSyncFailed(true);
                                    return;
                                }else {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                }
                            });

                        }}>{ articleData?.description }</p>
                    </div>
                </section>

                <section className={articleStyles.articleImage} style={{ backgroundImage: articleData.background_image ? `url(${articleData?.background_image}` : 'linear-gradient(90deg, rgba(170,234,171,1) 0%, rgba(198,215,245,1) 100%)' }}>
                </section>

                <section className={articleStyles.articleBody}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent, setInformationUpdated }}>
                        {
                            articleContent?.map((element, index) => {
                                return (
                                    <div key={`ELEMENT-${index}`}>
                                        <BuildValue content={[index, element]} />
                                    </div>
                                )
                            })
                        }
                    </ClientContext.Provider>

                    
                </section>
            </StickyContainer>  

            <Footer />  
        </div>
    )
}

const debounceStorageUpdate = debounce((data, info, callback) => {
    console.log(`SYNCING`, data);
    client
        .from('articles')
        .update({
            ...data,
            date: new Date()
        })
        .eq('id', info)
        .then(e => {
            callback(e);
            console.log(`SYNCED`, e.data);
        });
});

function debounce(func, timeout = 1000){
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}