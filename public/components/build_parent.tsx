import React, { useContext, useEffect, useState } from 'react'
import styles from '@styles/Stocks.module.css'

import BuildInput from './build_input'
import BuildValue from './build_value'
import { ClientContext } from './context'

export const BuildParent: React.FC<{ content: [number, { type: string, content: string, input: boolean }], callback: Function }> = ({ content, callback }) => {
    const { articleContent: articleData, setArticleContent } = useContext(ClientContext);
    const [ itemState, setItemState ] = useState(articleData[content[0]]);
    
    useEffect(() => {
        // check for deletion if there is nothing in the div, delete it.
        if(itemState.type == 'deleted' || (itemState.content.trim() == '' && itemState.input == false)) {
            setArticleContent([...articleData.slice(0, content[0]), ...articleData.slice(content[0]+1, articleData.length)])
        }
        
        if(articleData[content[0]].content !== itemState.content) 
            setArticleContent([...articleData.slice(0, content[0]), itemState, ...articleData.slice(content[0]+1, articleData.length)])
    }, [itemState]);

    return (
        <div className={styles.inputModule}>
        {
            itemState.input ?
            <BuildInput content={[content[0], itemState]} callback={setItemState} onLeave={(value) =>  {
                value.content ?
                setArticleContent([...articleData.slice(0, content[0]), value, ...articleData.slice(content[0]+1, articleData.length)])
                :
                setArticleContent([...articleData.slice(0, content[0]), ...articleData.slice(content[0]+1, articleData.length)])
            }}/>
            :
            <BuildValue content={[content[0], itemState]} callback={setItemState} />
        }
        </div>
    )
}

export default BuildParent