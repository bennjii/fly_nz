import React, { useEffect, useState } from 'react'
import styles from '@styles/Home.module.css'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Router, SingletonRouter } from 'next/router'
import Link from 'next/link'

export const Header: React.FC<{ title: string, type: string }> = ({ title, type }) => {
    if(type !== "admin")
        return (
            <div className={styles.header}>
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/icon.png" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </Head>

                <div>
                    <Link href={"/"}>
                        <div className={styles.headerIcon}>
                            <FontAwesomeIcon icon={faPaperPlane} /> 

                            <h3>
                                fly
                            </h3> 

                            {/* <h3 style={{ fontWeight: 300 }}>Articles</h3> */}
                        </div>
                    </Link>
                    

                    <div className={styles.headerLinks}>
                        <Link href={"/advice"}>
                            <a>Advice</a>
                        </Link>

                        {/* <a href="/stocks">Stocks</a> */}

                        <Link href={"/articles"}>
                            <a>Articles</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
    else 
        return (
            <div className={styles.header}>
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>
                    <Link href={"/admin"}>
                        <div className={styles.headerIcon}>
                            <FontAwesomeIcon icon={faPaperPlane} /> 

                            <h3>
                                fly
                            </h3> 
                        </div>
                    </Link>
                    

                    <div className={styles.headerLinks}>
                        <Link href={"/"}>
                            <a>FlyNZ Home</a>
                        </Link>

                        <Link href={"/admin"}>
                            <a>Your Articles</a>
                        </Link>
                    </div>
                </div>
            </div>
        )
}

export default Header