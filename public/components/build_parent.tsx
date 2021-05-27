import React, { useContext, useEffect, useState } from 'react'
import styles from '@styles/Stocks.module.css'

import BuildInput from './build_input'
import BuildValue from './build_value'
import { ClientContext } from './context'

export const BuildParent: React.FC<{ content: [number, { type: string, content: string, input: boolean }], callback: Function }> = ({ content, callback }) => {
    const { articleContent: articleData, setArticleContent: setArticleData } = useContext(ClientContext);
    const [ itemState, setItemState ] = useState(articleData[content[0]]);
    
    useEffect(() => {
        // check for deletion
        
        if(articleData[content[0]] !== itemState) setArticleData([...articleData.slice(0, content[0]), itemState, ...articleData.slice(content[0]+1, articleData.length)])
    }, [itemState]);

    return (
        <div className={styles.inputModule}>
        {
            itemState.input ?
            <BuildInput content={[content[0], itemState]} callback={setItemState} onLeave={(value) => setArticleData([...articleData.slice(0, content[0]), value, ...articleData.slice(content[0]+1, articleData.length)])}/>
            :
            <BuildValue content={[content[0], itemState]} callback={setItemState} />
        }
        </div>
    )
}

let lastUpdate = new Date().getTime();

const debounceStorageUpdate = (data, callback) => {
    console.log(new Date().getTime() - lastUpdate);
    
    if(new Date().getTime() - lastUpdate >= 2500) {
        callback(data);

        lastUpdate = new Date().getTime();
    }else {
        setTimeout(() => debounceStorageUpdate(data, callback), 2500);
    }
}   

export default BuildParent