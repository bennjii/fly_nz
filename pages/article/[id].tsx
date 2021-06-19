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
        
        const filteredData = articleContent?.filter(e => e.content !== '');
        if(JSON.stringify(articleContent) !== JSON.stringify(filteredData)) setArticleContent(filteredData);

        if(JSON.stringify(articleData) !== JSON.stringify({ ...articleData, content: filteredData })) {
            setInformationUpdated(false);

            debounceStorageUpdate({ ...articleData, content: filteredData }, INDEX, (e) => {
                setInformationUpdated(true)
            });
        }
    }, [articleContent]);

    return (
        <div className={styles.container}>
            <Header title={articleData?.title ? articleData?.title : 'create'} type={"admin"}/>
            
            <div className={articleSyles.article}>
                <section className={articleSyles.articleHeader}>
                    <div>
                        <h1>{ articleData?.title }</h1>
                    </div>
                </section>

                <section className={articleSyles.articleBody + " " + articleSyles.articleBodyView}>
                    <ClientContext.Provider value={{ articleContent, setArticleContent, setInformationUpdated }}>
                        {
                            articleContent?.map((element, index) => {
                                return (
                                    <div key={Math.random() * 10000}>
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

let lastUpdate = new Date().getTime();

const debounceStorageUpdate = (data, info, callback) => {
    if(new Date().getTime() - lastUpdate >= 1500) {
        console.log("Debounce Failed")

        client
            .from('articles')
            .update(data)
            .eq('id', info)
            .then(e => callback(e))

        lastUpdate = new Date().getTime();
    }else {
        console.log("Debounce Failed")
        setTimeout(() => debounceStorageUpdate(data, info, callback), 1500);
    }
}   