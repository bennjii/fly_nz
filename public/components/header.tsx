import React, { useEffect, useState } from 'react'
import styles from '@styles/Home.module.css'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Router, SingletonRouter } from 'next/router'
import Link from 'next/link'

export const Footer: React.FC<{ title: string }> = ({ title }) => {
    return (
        <div className={styles.header}>
             <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <Link href={"/"}>
                    <div className={styles.headerIcon}>
                        <FontAwesomeIcon icon={faPaperPlane} /> 

                        <h3>
                            fly
                        </h3> 
                    </div>
                </Link>
                

                <div className={styles.headerLinks}>
                    <Link href={"/advice"}>
                    <a>Advice</a>
                    </Link>

                    <Link href={"/stocks"}>
                    <a>Stocks</a>
                    </Link>

                    <Link href={"/articles"}>
                    <a>Articles</a>
                    </Link>
                </div>
            </div>
      </div>
    )
}

export default Footer