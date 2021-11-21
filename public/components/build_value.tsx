import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from '@styles/Article.module.css'

import { Plus, Search as SearchIcon } from 'react-feather'
import PageBreak from './page_break'
import { ClientContext } from './context'

import { MoreVertical } from 'react-feather'

function useOutsideAlerter(ref, ref_ig, callback) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && ref_ig.current && !ref_ig.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);
}

export const BuildValue: React.FC<{ content: [number, { type: string, content: string, input: boolean }], readonly?: boolean }> = ({ content, readonly }) => {
    const [ index, data ] = content;

    const { articleContent, setArticleContent } = useContext(ClientContext);

    const [ hovered, setHovered ] = useState(false);
    const [ itemSettings, setItemSettings ] = useState(false); 

    const [ inputState, setInputState ] = useState(data); 

    useEffect(() => {
        if(data.input == true) {
            input_field.current.children[0].focus();
        }
    }, [])

    useEffect(() => {
        // onLeave({ ...inputState });
    }, [inputState])

    const onLeave = (value) => {
        setItemSettings(false);

        if(value.content) {
            articleContent.splice(content[0], 1, value);
        }else {
            articleContent.splice(content[0], 1);
        }

        setArticleContent([...articleContent]);
    }

    const input_field = useRef(null);
    const editor_settings = useRef(null);
    const ignore_elem = useRef(null);

    useOutsideAlerter(editor_settings, ignore_elem, () => {
        if(!itemSettings) setItemSettings(false);
    });

    if(inputState.type == "deleted")
        return <></>;

    if(readonly)
        return (
            <div className={styles.inputFieldContainer}>
                <div className={styles.relativeEditorContent + " " + styles.readonlyDiv}>
                    {
                        (() => {
                            switch(data.type) {
                                case "h1":
                                    return (
                                        <h1 dangerouslySetInnerHTML={{ __html: data.content }} /> 
                                    )
                                case "h2":
                                    return (
                                        <h2 dangerouslySetInnerHTML={{ __html: data.content }} />
                                    )
                                case "h3":
                                    return (
                                        <h3 dangerouslySetInnerHTML={{ __html: data.content }} />
                                    )
                                case "p":
                                    return (
                                        <p dangerouslySetInnerHTML={{ __html: data.content }} />
                                    )
                                case "img":
                                    return (
                                        <div className={styles.imageContainer}>
                                            <img src={data.content}/>
                                            <i>{data.content}</i>
                                        </div>
                                        
                                    )
                                case "pageBreak":
                                    return (
                                        <PageBreak />
                                    )
                                default:
                                    return (
                                        <p dangerouslySetInnerHTML={{ __html: data.content }} /> 
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
            <div className={styles.relativeEditor}>
                <div onClick={() => {
                    articleContent.splice(index+1, 0, {
                        type: data.type,
                        content: ' ',
                        input: true
                    });

                    setArticleContent([...articleContent]);
                }}>
                    <Plus height={18} opacity={ hovered || data.input || itemSettings ? 0.5 : 0 } />
                </div>

                <div onClick={() => {
                    setItemSettings(!itemSettings);
                }} className={itemSettings && styles.hoveredElem} ref={ignore_elem}>
                    <MoreVertical height={18} opacity={ hovered || data.input || itemSettings ? 0.5 : 0 }/>

                    {
                        itemSettings &&
                        <div className={styles.editorSettings} ref={editor_settings}>
                            <div onClick={() => { setInputState({ ...inputState, type: 'h1' }); setItemSettings(false) }}>Header 1</div>
                            <div onClick={() => { setInputState({ ...inputState, type: 'h2' }); setItemSettings(false) }}>Header 2</div>
                            <div onClick={() => { setInputState({ ...inputState, type: 'h3' }); setItemSettings(false) }}>Header 3</div>
                            <div onClick={() => { setInputState({ ...inputState, type: 'p' }); setItemSettings(false) }}>Text</div>
                            <div onClick={() => { setInputState({ ...inputState, type: 'img' }); setItemSettings(false) }}>Image</div>
                            <div onClick={() => { setInputState({ ...inputState, type: 'pageBreak' }); setItemSettings(false) }}>Page Break</div>
                            <div style={{ color: '#f00f00a4', backgroundColor: '#f00f000e' }} onClick={() => { setInputState({ content: '', type: 'deleted', input: false }); setItemSettings(false); onLeave({ ...inputState, input: false }) }}>Delete</div>
                        </div>
                    }
                </div>
            </div>

            <div 
                className={styles.relativeEditorContent} 
                ref={input_field}
                onBlur={() => {
                    onLeave({ ...inputState, input: false });
                }}
                onKeyDown={(e) =>{
                    if(e.key == "Enter") {
                        e.preventDefault();

                        articleContent.splice(index+1, 0, {
                            type: data.type,
                            content: ' ',
                            input: true
                        });
    
                        setArticleContent([...articleContent]);
                    }
                }}
                onClick={(e) => {
                    // @ts-expect-error
                    if(e.target.tagName !== 'svg') setInputState({ ...inputState, input: true });
                }}>
                {
                    (() => {
                        switch(inputState.type) {
                            case "h1":
                                return (
                                    <h1 contentEditable onBlur={(e) => {
                                        if(e.target.innerHTML) setInputState({ ...inputState, content: e.target.innerHTML })
                                    }}>{data.content}</h1>
                                )
                            case "h2":
                                return (
                                    <h2 contentEditable onBlur={(e) => {
                                        if(e.target.innerHTML) setInputState({ ...inputState, content: e.target.innerHTML })
                                    }}>{data.content}</h2>
                                )
                            case "h3":
                                return (
                                    <h3 contentEditable onBlur={(e) => {
                                        if(e.target.innerHTML) setInputState({ ...inputState, content: e.target.innerHTML })
                                    }}>{data.content}</h3>
                                )
                            case "p":
                                return (
                                    <p contentEditable onBlur={(e) => {
                                        console.log(e);
                                        if(e.target.innerHTML) setInputState({ ...inputState, content: e.target.innerHTML })
                                    }}>{data.content}</p>
                                )
                            case "img":
                                return (
                                    <div className={styles.imageContainer}>
                                        <img src={data.content}/>
                                        <i>{data.content}</i>
                                    </div>
                                    
                                )
                            case "pageBreak":
                                return (
                                    <PageBreak />
                                )
                            case "deleted":
                                return (
                                    <p style={{ color: 'red' }}>Content Removed: {data.content}</p>
                                )
                            default:
                                return (
                                    <p>{data.content}</p> 
                                )
                    }})()
                }
            </div>
        </div>
    )
}

export default BuildValue