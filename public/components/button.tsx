import React, { useEffect, useState } from 'react'
import styles from '@styles/Button.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { SingletonRouter } from 'next/router'

export const Button: React.FC<{ title: string, active?: boolean, redirect?: string | never, router?: any | never, onClick?: Function, disabled?: boolean }> = ({ title, active, redirect, router, onClick, disabled }) => {
    const [ buttonState, setButtonState ] = useState({
        active: false,
        hovered: false,
        value: title,
        activated: false
    })

    const activate = () => {
        setButtonState({ ...buttonState, active: true });
    }

    const deactivate = () => {
        setButtonState({ ...buttonState, active: false });
    }

    const handleClick = (e) => {
        setButtonState({ ...buttonState, activated: true });

        if(onClick) onClick(e, (e) => { setButtonState({ ...buttonState, activated: false })})
        
        if(redirect) {
            router.push(redirect)
            setButtonState({ ...buttonState, activated: false })
        }
    }

    return (
        <button 
            type="submit" 
            onClick={handleClick}  
            className={(buttonState.hovered) ? `${styles.hoverButton} ${styles.button} ${(disabled) ? styles.buttonDisabled : (active) ? styles.buttonEnabled : ''}` : `${(disabled) ? styles.buttonDisabled : (active) ? styles.buttonEnabled : ''} ${styles.button}`} 
            onMouseOver={() => setButtonState({ ...buttonState, hovered: true })} 
            onMouseLeave={() => setButtonState({ ...buttonState, hovered: false })}
            disabled={disabled}
        >
            {
                (!buttonState.activated)
                ?
                title
                :
                <FontAwesomeIcon
                icon={faCircleNotch}
                size="1x"
                spin
                />   
            }
        </button>
    )
}

export default Button