import React, { useContext, useState } from 'react'
import styles from '@styles/Article.module.css'
import { ClientContext } from './context';

export const BuildInput: React.FC<{ content: [number, { type: string, content: string, input: boolean }], callback: Function, onLeave: Function }> = ({ content, callback, onLeave }) => {
    const { setInformationUpdated } = useContext(ClientContext);
    const [ index, data ] = content;
    const [ inputState, setInputState ] = useState(data); 
    const [ saveState, setSaveState ] = useState(data.content);

    const closeAndUpdate = () => {
        setInputState({ ...inputState, content: saveState });

        onLeave({ ...inputState, content: saveState, input: false });
        callback({  ...inputState, content: saveState, input: false });
    }

    const [ keyPressed, setKeyPressed ] = useState([]);

    return (
        <div className={styles.inputContainer}>
            <textarea 
                autoFocus
                placeholder={"Type here..."}
                defaultValue={inputState.content}
                onChange={(e) => { 
                    setSaveState(e.target.value);
                    // setInformationUpdated(false);
                }}
                rows={inputState.content.split(/\r\n|\r|\n/).length}
                onKeyDown={(e) => {
                    if(e.code == "Enter") {
                        closeAndUpdate();
                    }

                    setKeyPressed([ ...keyPressed, e.code ]);
                }}
                onKeyUp={(e) => {
                    keyPressed.forEach((el, index) => {
                        if(el == e.code) {
                            setKeyPressed(keyPressed.splice(index, 1));
                        }
                    });
                }}
                onBlur={() => {
                    onLeave({ ...inputState, input: false });
                    callback({ ...inputState, input: false });
                }}
                className={
                    `
                    ${styles.articleInput}  
                    ${styles[`articleInput_${data.type}`]}
                    `
                }
            />
        </div>
    )
}

export default BuildInput