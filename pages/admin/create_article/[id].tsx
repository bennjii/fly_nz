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

const INDEX = (process.browser) ? window.location.href.split('/')[window.location.href.split('/').length - 1] : null;

export default function Home() {
    const [ articleData, setArticleData ] = useState(null);
    const [ articleContent, setArticleContent ] = useState<{type: string, content: string, input: boolean}[]>(null);
    const [ informationUpdated, setInformationUpdated ] = useState(false);

    useEffect(() => {
        if(process.browser)
            client
                .from('articles')
                .select()
                .eq('id', INDEX)
                .then(e => {
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

                    setArticleContent(e.data[0].content)
                });
    }, []);

    useEffect(() => {
        setInformationUpdated(false);

        const filteredData = articleContent?.filter(e => e.content !== '');
        console.log("Filtered", filteredData);

        setArticleData({ ...articleData, content: filteredData });
    }, [articleContent]);

    useEffect(() => {
        setInformationUpdated(false);
        
        if(articleData) debounceStorageUpdate({ ...articleData, content: articleData.content.filter(e => e.content !== '')}, setInformationUpdated);
    }, [articleData])

    return (
        <div className={styles.container}>
            <Header title={"Create"}/>
            
            <div className={articleSyles.article}>
                <section className={articleSyles.articleHeader}>
                    <div>
                        <h1>{ articleData?.title }</h1>

                        {
                            informationUpdated ?
                            <div className={articleSyles.articleSynced}>
                                Synced
                            </div>
                            :
                            <div className={articleSyles.articleSyncing}>
                                Syncing
                            </div>
                        }
                    </div>
                </section>

                <section className={articleSyles.articleBody}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent }}>
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

const debounceStorageUpdate = (data, callback) => {
    console.log(new Date().getTime() - lastUpdate);

    if(new Date().getTime() - lastUpdate >= 2500) {
        client
            .from('articles')
            .update(data)
            .eq('id', INDEX)
            .then(e => console.log(e))

        callback(true);

        lastUpdate = new Date().getTime();
    }else {
        setTimeout(() => debounceStorageUpdate(data, callback), 2500);
    }
}   