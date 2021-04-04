import React, { useEffect, useState } from 'react'
import styles from "@styles/Article.module.css"

import { Router } from 'next/router'

export const Article: React.FC<{ title: string, tags: any[], image: string, desc: string, size: 0 | 1, redirect: string }> = ({ title, tags, image, desc, size, redirect }) => {

    return (
        <div>
            <img src={image} alt=""/>
        </div>
    )
}

export default Article