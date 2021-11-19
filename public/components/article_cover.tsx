import React, { useEffect, useState } from 'react'
import styles from "@styles/Article.module.css"

import { Router, useRouter } from 'next/router'
import { Pill, Color }  from '@components/pill'
import Link from 'next/link'
interface Tag {
    title: string,
    color: Color
}

export const Article: React.FC<{ title: string, tags: Tag[], image: string, desc: string, size: 0 | 1 }> = ({ title, tags, image, desc, size }) => {
    const router = useRouter();

    const [ redirect, setRedirect ] = useState(title ? title.replaceAll(" ", "-")?.toLowerCase() : "");

    return (   
        <div 
        className={styles.articleElementDiv}>
            {
                (size == 0) ?
                // Small
                <Link href={`/article/${redirect}`}>
                    <div className={styles.articleSmall}>
                        {
                            image ? 
                            <img src={image} alt=""/>
                            :
                            <div className={styles.imagePlaceholder}></div>           
                        }

                        <div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            {
                                tags?.map((e, index) => {
                                    return (
                                        <Pill title={e.title} color={e.color} key={`KEY__P_${index}`}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Link>
                :
                // Large
                <Link href={`/article/${redirect}`}>
                    <div className={styles.articleLarge}>
                        {
                            image ? 
                            <img src={image} alt=""/>
                            :
                            <div className={styles.imagePlaceholder}></div>             
                        }

                        <div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                            {
                                tags?.map((e, index) => {
                                    return (
                                        <Pill title={e.title} color={e.color} key={`KEY__P_${index}`}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Link>
            }
        </div>
        
    )
}

export default Article