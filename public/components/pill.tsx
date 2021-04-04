import React, { useEffect, useState } from 'react'
import styles from '@styles/Pill.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { SingletonRouter } from 'next/router'

export interface Color {
    background: string, // 225,176,162
    foreground: string  // darker bcolor
}

export const Pill: React.FC<{ title: string, color: Color, disabled?: boolean }> = ({ title, color, disabled }) => {
    const [ buttonState, setButtonState ] = useState({
        hovered: false,
        value: title,
        color: color
    })

    return (
        <div  
            // style={{ color: `rgba(${color.foreground}, 1)`, backgroundColor: `rgba(${color.background}, 0.3)`, borderColor: `rgba(${color.foreground}, 0.8)` }}
            className={(buttonState.hovered) ? `${styles.hoverButton} ${styles.button} ${(disabled) ? styles.buttonDisabled : ''}` : `${(disabled) ? styles.buttonDisabled : ''} ${styles.button}`} 
            onMouseOver={() => setButtonState({ ...buttonState, hovered: true })} 
            onMouseLeave={() => setButtonState({ ...buttonState, hovered: false })}
        >{ title }</div>
    )
}

export default Pill