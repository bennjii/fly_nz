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

export default function Home() {
    const [ articleData, setArticleData ] = useState(null);
    const [ articleContent, setArticleContent ] = useState<{type: string, content: string, input: boolean}[]>(null);
    const [ informationUpdated, setInformationUpdated ] = useState(false);

    const [ articleSettingsOverlay, setArticleSettingsOverlay ] = useState(false);

    const router = useRouter();
    const INDEX = (router.query.id) ? router.query.id : null;

    useEffect(() => {
        if(process.browser && INDEX !== null)
            client
                .from('articles')
                .select()
                .eq('id', INDEX)
                .then(e => {
                    if(e.data) {
                        setArticleData(
                            { 
                                ...e.data[0], 
                                content: 
                                    ( e.data[0].content == [] ? 
                                        [{ type: "p", content: 'START WRITING HERE', input: false}] 
                                        : 
                                        e.data[0].content
                                    ) 
                            }
                        );

                        setArticleContent(e.data[0].content);
                        setInformationUpdated(true);
                    }
                });
    }, [INDEX]);

    useEffect(() => {
        if(!articleData) return;

        setInformationUpdated(false);

        const filteredData = articleContent?.filter(e => e.content !== '');
        if(JSON.stringify(articleContent) !== JSON.stringify(filteredData)) setArticleContent(filteredData);

        if(JSON.stringify(articleData) !== JSON.stringify({ ...articleData, content: filteredData })) debounceStorageUpdate({ ...articleData, content: filteredData }, INDEX, (e) => {
            setInformationUpdated(true)
        });
    }, [articleContent]);

    return (
        <div className={styles.container}>
            <Header title={articleData?.title ? articleData?.title : 'create'}/>
            
            <div className={articleSyles.article}>
                {
                    articleSettingsOverlay ?
                    <div className={styles.settingsOverlay} onClick={(e) => {
                        //@ts-expect-error
                        if(e.target.classList.contains(styles.settingsOverlay)) {
                            setArticleSettingsOverlay(false);
                        }
                    }}>
                        <div>
                            <h1>Settings</h1>

                            <div>
                                <h3>Article Visiblity</h3> <p>{articleData?.published ? "Published" : "Draft"}</p>
                            </div>

                            <Button title={articleData?.published ? "Redact" : "Publish"} onClick={(e, callback) => {
                                debounceStorageUpdate({ ...articleData, published: !articleData?.published }, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true);
                                    callback();
                                });
                            }}></Button>

                            <div>
                                <h3>Title</h3> <p>{articleData?.title}</p>
                            </div>

                            <Input type={"text"} defaultValue={articleData?.title} onKeyDown={(e) => {
                                if(e.code == "Enter")
                                    debounceStorageUpdate({ ...articleData, title: e.target.value }, INDEX, (e) => {
                                        setArticleData(e.data[0]);
                                        setInformationUpdated(true)
                                    });
                            }}/>

                            <div>
                                <h3>Sync Status</h3> <p>{informationUpdated ? "Synced" : "Syncing"}</p>
                            </div>

                            <Button title={"Force Sync"} onClick={() => {
                                debounceStorageUpdate(articleData, INDEX, (e) => {
                                    setArticleData(e.data[0]);
                                    setInformationUpdated(true)
                                });
                            }}></Button>
                        </div>
                    </div>
                    :
                    <></>
                }

                <section className={articleSyles.articleHeader}>
                    <div>
                        <h1>{ articleData?.title }</h1>

                        <div className={styles.headerTitleAid}>
                            <div onClick={() => {
                                setArticleSettingsOverlay(!articleSettingsOverlay);
                            }}>
                                <MoreVertical size={18} />
                            </div>

                            {
                                informationUpdated ?
                                <div className={articleSyles.articleSynced}>
                                    Synced 
                                    <Check size={18} />
                                </div>
                                :
                                <div className={articleSyles.articleSyncing}>
                                    Syncing
                                    <RefreshCw size={18} />
                                </div>
                            }
                        </div>
                    </div>
                </section>

                <section className={articleSyles.articleBody}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent, setInformationUpdated }}>
                        <NewElement index={0} callmap={articleContent} callback={setArticleContent}/>
                        {
                            articleContent?.map((element, index) => {
                                return (
                                    <div key={Math.random() * 10000}>
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

let lastUpdate = new Date().getTime();

const debounceStorageUpdate = (data, info, callback) => {
    if(new Date().getTime() - lastUpdate >= 1500) {
        client
            .from('articles')
            .update(data)
            .eq('id', info)
            .then(e => callback(e))

        lastUpdate = new Date().getTime();
    }else {
        setTimeout(() => debounceStorageUpdate(data, info, callback), 1500);
    }
}   