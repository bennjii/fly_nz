
import Head from 'next/head'
import Router from 'next/router'

import { useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleSyles from '@styles/Article.module.css'

import Header from '@components/header'
import Button from '@components/button'
import Footer from '@components/footer'
import PageBreak from '@components/page_break'
import NewElement from '@components/new_element_arc'

import { Plus } from 'react-feather'

export default function Home() {
    const [ articleData, setArticleData ] = useState([
        {
            type: "h1",
            content: 'Taxation',
            input: false
        },
        {
            type: "p",
            content: 'Taxation or Tax is the way in which the government charges the general public money, which in-turn is invested into infrastructure, funding hospitals and much more... \n This is important as without it, our society would not be able to function in as humane way as it does now. However, these benefits come at a cost to the population - namely through tax. \n\n The most common forms of tax for the general public being: GST & Income Tax.',
            input: false
        }
    ]);

    return (
        <div className={styles.container}>
            <Header title={"Home"}/>
            
            <div className={articleSyles.article}>
                <section className={articleSyles.articleHeader}>
                    <div>
                        <h1>What are Taxes?</h1>
                    </div>
                </section>

                <section className={articleSyles.articleBody}>
                    {
                        articleData.map((element, index) => {
                            return (
                                <div key={index}>
                                    { (index == 0) && <NewElement index={index} callmap={articleData} callback={setArticleData}/> }

                                    <div onClick={() => {
                                        const newData = articleData;
                                        newData[index].input = !newData[index].input;
                                        setArticleData(newData);
                                    }}>
                                    {
                                        element.input ?
                                        <input placeholder={element.content} />
                                        :
                                        (() => {
                                            switch(element.type) {
                                                case "h1":
                                                    return (
                                                        <h1>
                                                            {
                                                                element.content
                                                            }
                                                        </h1> 
                                                    )
                                                case "h2":
                                                    return (
                                                        <h2>
                                                            {
                                                                element.content
                                                            }
                                                        </h2> 
                                                    )
                                                case "h3":
                                                    return (
                                                        <h3>
                                                            {
                                                                element.content
                                                            }
                                                        </h3> 
                                                    )
                                                case "p":
                                                    return (
                                                        <p>
                                                            {
                                                                element.content
                                                            }
                                                        </p> 
                                                    )
                                                case "pageBreak":
                                                    return (
                                                        <PageBreak />
                                                    )
                                                default:
                                                    return (
                                                        <p>
                                                            {
                                                                element.content
                                                            }
                                                        </p> 
                                                    )
                                            
                                        }})()
                                    }
                                    </div>

                                    <NewElement index={index+1} callmap={articleData} callback={setArticleData} />
                                </div>
                            )
                        })
                    }
                </section>
            </div>  

            <Footer />  
        </div>
    )
}

