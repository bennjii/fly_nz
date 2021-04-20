
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
            content: 'Taxation'
        },
        {
            type: "p",
            content: 'Taxation or Tax is the way in which the government charges the general public money, which in-turn is invested into infrastructure, funding hospitals and much more... \n This is important as without it, our society would not be able to function in as humane way as it does now. However, these benefits come at a cost to the population - namely through tax. \n\n The most common forms of tax for the general public being: GST & Income Tax.'
        }
    ])
    return (
        <div className={styles.container}>
            <Header title={"Home"}/>
            
            <body className={articleSyles.article}>
                <section className={articleSyles.articleHeader}>
                    <div>
                        <h1>What are Taxes?</h1>
                    </div>
                </section>

                <section className={articleSyles.articleBody}>
                    <h1>Header 1</h1>
                    <h2>Header 2</h2>
                    <h3>Header 3</h3>
                    <p>Normal Text</p>
                    <br/>
                    <p>line break</p>
                    <br/> <br/>
                    <p>paragraph break</p>
                    <PageBreak />
                    
                    <p>section break</p>

                    {
                        articleData.map((element, index) => {
                            return (
                                <div>
                                    {
                                        (index == 0) && <NewElement index={index} callmap={articleData} />
                                    }

                                    {
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
                                            }
                                            
                                        })()
                                    }

                                    <NewElement index={index} callmap={articleData} />
                                </div>
                            )
                        })
                    }
                    
                    <h1>Taxation</h1>
                    <p>Taxation or Tax is the way in which the government charges the general public money, which in-turn is invested into infrastructure, funding hospitals and much more... <br/> This is important as without it, our society would not be able to function in as humane way as it does now. However, these benefits come at a cost to the population - namely through tax. <br /><br /> The most common forms of tax for the general public being: GST & Income Tax.</p>

                    <br/>

                    <h3>GST (Tax on Goods)</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora vitae placeat dicta beatae! Voluptas maiores, possimus sequi repellendus enim, repellat ipsum quasi sit accusantium doloremque eum minus quam accusamus aut esse! Exercitationem ipsam cupiditate fugit libero asperiores delectus impedit sunt sed ullam, obcaecati optio harum saepe quod consequuntur magnam excepturi.</p>

                    <br/>

                    <h3>Income Tax (Tax on Income)</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quod ipsam sit perferendis earum consequuntur perspiciatis tenetur aspernatur, velit veniam molestias dignissimos! Reiciendis delectus sequi similique! Distinctio, quis itaque quam tempore consequuntur nostrum asperiores dolores amet mollitia, quasi beatae nihil est excepturi accusamus dolorum alias doloribus cupiditate? Quisquam totam, qui perspiciatis iste dignissimos, laborum, mollitia recusandae repudiandae sed nesciunt praesentium.</p>

                    <p>For some, this may be a noticable dent in income...</p>

                    <br/>
                    
                    <h2>How to manage tax</h2>
                    <p>Learning how to manage the impact tax has on your income and purchases is crucial towards improving your financial skills... Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eaque assumenda numquam laboriosam voluptas, nostrum modi ex itaque dolor quisquam impedit, totam ullam! Fugiat, voluptas. Quaerat alias, ut possimus error delectus, ab, nostrum doloribus suscipit porro quia dolores? Nisi temporibus modi quidem ipsam ex illum aliquam obcaecati mollitia sint consequatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo excepturi similique repellendus ipsum, debitis, praesentium quas nesciunt labore sunt facilis placeat porro fuga modi numquam molestiae! Numquam nesciunt, et sequi voluptatibus quo ullam maxime quos ex, perspiciatis quia voluptas blanditiis! Quisquam enim, iste culpa tenetur suscipit nihil rerum ex voluptates aut repudiandae et omnis. Saepe praesentium libero odit animi explicabo quidem, sed unde iste fuga nostrum tenetur qui, alias maxime nihil possimus amet labore! Cum numquam, repellendus itaque, omnis eaque placeat magnam incidunt nobis non illum asperiores natus perspiciatis! Expedita esse facere libero vitae veniam. Eveniet sit quam molestiae natus!</p>
                </section>
            </body>  

            <Footer />  
        </div>
    )
}

