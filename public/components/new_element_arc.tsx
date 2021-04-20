import React, { useEffect, useState } from 'react'
import styles from '@styles/Article.module.css'

import { Plus } from 'react-feather'

export const NewElement: React.FC<{ index: number, callmap: { content: string, type: string }[] }> = ({ index, callmap }) => {
    const [ hovered, setHovered ] = useState(false);

    return ( 
        <div 
            className={`${styles.pageLine} ${hovered ? styles.visiblePageLine : styles.invisivblePageLine}`} 
            onMouseOver={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
        > 
            <Plus strokeWidth={1.5}/> 
            <hr/>
        </div>
    )
}

export default NewElement