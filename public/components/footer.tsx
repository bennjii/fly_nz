import React, { useEffect, useState } from 'react'
import styles from '@styles/Home.module.css'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Router, SingletonRouter } from 'next/router'
import Link from 'next/link'

export const Footer: React.FC<{ }> = ({ }) => {
    return (
        <div className={styles.footer}>
            <Link href={"/"}>
                <div className={styles.headerIcon}>
                    <FontAwesomeIcon icon={faPaperPlane} /> 

                    <h3>
                        fly
                    </h3> 
                </div>
            </Link>
        </div>
    )
}

export default Footer