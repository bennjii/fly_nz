import { useEffect, useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleSyles from '@styles/Article.module.css'

import Header from '@components/header'
import Footer from '@components/footer'
import NewElement from '@components/new_element_arc'

import BuildParent from '@components/build_parent'
import { ClientContext } from '@components/context'

import client from '@components/client'
import { Router, useRouter } from 'next/router'

export async function getStaticProps(context) {
    if(client.auth.user())
        return ({ props: client })
    else
        return {
            redirect: {
                destination: '/admin/auth',
                permanent: false,
            },
        }
}

export default function Home() {
    const [ articleData, setArticleData ] = useState([ ]);

    const [ informationUpdated, setInformationUpdated ] = useState(false);

    if(!client.auth.user()) {
        
    }

    useEffect(() => {
        console.log(articleData)

        debounceStorageUpdate(articleData, setInformationUpdated);
    }, [articleData])

    return (
        <div className={styles.container}>
            <Header title={"Create"}/>
            
            <div className={articleSyles.article}>
                <section className={articleSyles.articleHeader}>
                    <div>
                        <h1>What are Taxes?</h1>

                        {
                            informationUpdated ?
                            <div>
                                Synced
                            </div>
                            :
                            <div>
                                Syncing
                            </div>
                        }
                    </div>
                </section>

                <section className={articleSyles.articleBody}>
                    <ClientContext.Provider value={{ articleData, setArticleData }}>
                        <NewElement index={0} callmap={articleData} callback={setArticleData}/>
                        {
                            articleData.map((element, index) => {
                                return (
                                    <div key={Math.random() * 10000}>
                                        <BuildParent content={[index, element]} callback={setArticleData} />

                                        <NewElement index={index+1} callmap={articleData} callback={setArticleData} />
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
        console.log('UPDATED!!!')

        //client.from('articles')

        callback(true);

        lastUpdate = new Date().getTime();
    }else {
        setTimeout(() => debounceStorageUpdate(data, callback), 2500);
    }
}   