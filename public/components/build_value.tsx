import React, { useEffect, useRef, useState } from 'react'
import styles from '@styles/Article.module.css'

import { Search as SearchIcon } from 'react-feather'
import axios from 'axios'

import token from '@components/token'
import PageBreak from './page_break'

import { MoreVertical } from 'react-feather'

export const BuildValue: React.FC<{ content: [number, { type: string, content: string, input: boolean }], callback: Function, onLeave: Function, readonly?: boolean }> = ({ content, callback, onLeave, readonly }) => {
    const [ index, data ] = content;

    const [ hovered, setHovered ] = useState(false);
    const [ itemSettings, setItemSettings ] = useState(false); 

    const [ inputState, setInputState ] = useState(data); 
    const [ saveState, setSaveState ] = useState(data.content);

    let clone = data.content;

    clone = clone.split('>').join('&gt;');
    clone = clone.split('<').join('&lt;');

    clone = clone.split('\n').join('<br/>');
    clone = clone.split('\r').join('<br/>');
    clone = clone.split('\n\r').join('<br/>');

    const updateParent = (e) => {
        console.log(e.target.value)
    }

    const input_field = useRef(null);

    useEffect(() => {
        if(data.input == true) {
            console.log(input_field.current);
            input_field.current.children[0].focus();
        }
    })

    const closeAndUpdate = () => {
        console.log(inputState, saveState);
        
        setInputState({ ...inputState, content: saveState });

        onLeave({ ...inputState, content: saveState, input: false });
        callback({  ...inputState, content: saveState, input: false });
    }

    if(readonly)
        return (
            <div className={styles.inputFieldContainer}>
                <div className={styles.relativeEditorContent + " " + styles.readonlyDiv}>
                    {
                        (() => {
                            switch(data.type) {
                                case "h1":
                                    return (
                                        <h1 dangerouslySetInnerHTML={{ __html: clone }} /> 
                                    )
                                case "h2":
                                    return (
                                        <h2 dangerouslySetInnerHTML={{ __html: clone }} />
                                    )
                                case "h3":
                                    return (
                                        <h3 dangerouslySetInnerHTML={{ __html: clone }} />
                                    )
                                case "p":
                                    return (
                                        <p dangerouslySetInnerHTML={{ __html: clone }} />
                                    )
                                case "img":
                                    return (
                                        <div className={styles.imageContainer}>
                                            <img src={clone}/>
                                            <i>{clone}</i>
                                        </div>
                                        
                                    )
                                case "pageBreak":
                                    return (
                                        <PageBreak />
                                    )
                                default:
                                    return (
                                        <p dangerouslySetInnerHTML={{ __html: clone }} /> 
                                    )
                        }})()
                    }
                </div>
            </div>
        )

    return (
        <div className={styles.inputFieldContainer} 
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {
                itemSettings &&
                <div className={styles.relativeEditor}>
                    <div className={styles.editorSettings}>
                        <p onClick={() => { callback({ ...content[1], type: 'h1' }); setItemSettings(false) }}>Header 1</p>
                        <p onClick={() => { callback({ ...content[1], type: 'h2' }); setItemSettings(false) }}>Header 2</p>
                        <p onClick={() => { callback({ ...content[1], type: 'h3' }); setItemSettings(false) }}>Header 3</p>
                        <p onClick={() => { callback({ ...content[1], type: 'p' }); setItemSettings(false) }}>Text</p>
                        <p onClick={() => { callback({ ...content[1], type: 'img' }); setItemSettings(false) }}>Image</p>
                        <p onClick={() => { callback({ ...content[1], type: 'pageBreak' }); setItemSettings(false) }}>Page Break</p>
                        <p style={{ color: '#f00f00a4', backgroundColor: '#f00f000e' }} onClick={() => { callback({ content: '', type: 'deleted', input: false }); setItemSettings(false) }}>Delete</p>
                    </div>
                </div>
            }

            <div className={styles.relativeEditor}>
                <MoreVertical height={18} opacity={ hovered ? 0.5 : 0 } onClick={() => {
                    setItemSettings(!itemSettings)
                }}/>
            </div>

            <div 
                className={styles.relativeEditorContent} 
                contentEditable
                ref={input_field}
                onBlur={() => {
                    onLeave({ ...inputState, input: false });
                    callback({ ...inputState, input: false });

                    closeAndUpdate();
                }}
                onKeyPress={(e) => {
                    //@ts-expect-error
                    if(e.target.children[0].innerHTML) setSaveState(e.target.children[0].innerHTML);
                }}
                onClick={(e) => {
                    console.log(e.target)
                    // @ts-expect-error
                    if(e.target.tagName !== 'svg') callback({ ...content[1], input: true });
                }}>
                {
                    (() => {
                        switch(data.type) {
                            case "h1":
                                return (
                                    <h1 dangerouslySetInnerHTML={{ __html: clone }} /> 
                                )
                            case "h2":
                                return (
                                    <h2 dangerouslySetInnerHTML={{ __html: clone }} />
                                )
                            case "h3":
                                return (
                                    <h3 dangerouslySetInnerHTML={{ __html: clone }} />
                                )
                            case "p":
                                return (
                                    <p dangerouslySetInnerHTML={{ __html: clone }} />
                                )
                            case "img":
                                return (
                                    <div className={styles.imageContainer}>
                                        <img src={clone}/>
                                        <i>{clone}</i>
                                    </div>
                                    
                                )
                            case "pageBreak":
                                return (
                                    <PageBreak />
                                )
                            default:
                                return (
                                    <p dangerouslySetInnerHTML={{ __html: clone }} /> 
                                )
                    }})()
                }
            </div>
        </div>
    )
}

export default BuildValue