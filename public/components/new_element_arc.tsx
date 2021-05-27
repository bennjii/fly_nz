import React, { useEffect, useState } from 'react'
import styles from '@styles/Article.module.css'

import { Plus } from 'react-feather'

export const NewElement: React.FC<{ index: number, callmap: { content: string, type: string }[], callback: Function }> = ({ index, callmap, callback }) => {
    const [ hovered, setHovered ] = useState(false);



    return ( 
        <div 
            className={`${styles.pageLine} ${hovered ? styles.visiblePageLine : styles.invisivblePageLine}`} 
            onMouseOver={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
                const newContent = {
                    type: "p",
                    content: '',
                    input: true
                };
                
                callback([...callmap.slice(0, index), newContent, ...callmap.slice(index, callmap.length)]);
            }}
        > 
            <Plus strokeWidth={1.5}/> 
            <hr/>
        </div>
    )
}

export default NewElement