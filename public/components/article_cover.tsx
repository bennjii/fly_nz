import React, { useEffect, useState } from 'react'
import styles from "@styles/Article.module.css"

import { Router } from 'next/router'
import { Pill, Color }  from '@components/pill'
interface Tag {
    title: string,
    color: Color
}

export const Article: React.FC<{ title: string, tags: Tag[], image: string, desc: string, size: 0 | 1, redirect: string }> = ({ title, tags, image, desc, size, redirect }) => {

    return (    
        (size == 0) ?
        // Small
        <div className={styles.articleSmall}>
            <img src={image} alt=""/>

            <div>
                <h3>{title}</h3>
                <p>{desc}</p>
                {
                    tags.map((e) => {
                        return (
                            <Pill title={e.title} color={e.color}/>
                        )
                    })
                }
            </div>
        </div>
        :
        // Large
        <div className={styles.articleLarge}>
            <img src={image} alt=""/>

            <div>
                <h3>{title}</h3>
                <p>{desc}</p>
                {
                    tags.map((e) => {
                        return (
                            <Pill title={e.title} color={e.color}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Article