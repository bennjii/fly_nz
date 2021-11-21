import React, { useContext, useEffect, useState } from 'react'
import styles from '@styles/Stocks.module.css'

import BuildInput from './build_input'
import BuildValue from './build_value'
import { ClientContext } from './context'

export const BuildParent: React.FC<{ content: [number, { type: string, content: string, input: boolean }]}> = ({ content }) => {
    const { articleContent: articleData, setArticleContent } = useContext(ClientContext);
    // useEffect(() => {
    //     // check for deletion if there is nothing in the div, delete it.
    //     if(itemState.type == 'deleted' || (itemState.content.trim() == '' && itemState.input == false)) {
    //         setArticleContent([...articleData.slice(0, content[0]), ...articleData.slice(content[0]+1, articleData.length)])
    //     }
        
    //     if(articleData[content[0]].content !== itemState.content) 
    //         setArticleContent([...articleData.slice(0, content[0]), itemState, ...articleData.slice(content[0]+1, articleData.length)])
    // }, [itemState]);

    return (
        <div className={styles.inputModule}>
            <BuildValue content={content} />
        </div>
    )
}

export default BuildParent