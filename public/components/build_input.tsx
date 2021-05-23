import React, { useEffect, useState } from 'react'
import styles from '@styles/Article.module.css'

import { Search as SearchIcon } from 'react-feather'
import axios from 'axios'

import token from '@components/token'
import { forEachChild } from 'typescript'

export const BuildInput: React.FC<{ content: [number, { type: string, content: string, input: boolean }], callback: Function, onLeave: Function }> = ({ content, callback, onLeave }) => {
    const [ index, data ] = content;
    const [ inputState, setInputState ] = useState(data); 

    const updateParent = (e) => {
        setInputState({ ...inputState, content: e.target.value });
    }

    const [ keyPressed, setKeyPressed ] = useState([]);

    return (
        <div className={styles.inputContainer}>
            <textarea 
                autoFocus
                defaultValue={inputState.content}
                onChange={updateParent}
                rows={inputState.content.split(/\r\n|\r|\n/).length}
                onKeyDown={(e) => {
                    if(e.code == "Enter") {
                        onLeave({ ...inputState, input: false });
                        callback({ ...inputState, input: false })
                    }

                    setKeyPressed([ ...keyPressed, e.code ]);

                    console.log(keyPressed);

                    // let enter_down = false;
                    // let shift_down = false;

                    // keyPressed.forEach(e => {
                    //     console.log(e)
                    //     if(e == "Enter") enter_down = true;
                    //     else if(e == "ShiftLeft") shift_down = true;
                    // });

                    // console.log(enter_down, shift_down)

                    // if(enter_down && !shift_down) {
                    //     onLeave({ ...inputState, input: false });
                    //     callback({ ...inputState, input: false })
                    // }
                }}
                onKeyUp={(e) => {
                    keyPressed.forEach((el, index) => {
                        console.log(el, e.code)
                        if(el == e.code) {
                            setKeyPressed(keyPressed.splice(index, 1));
                        }
                    });
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