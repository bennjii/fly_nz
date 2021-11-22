import React, { useEffect, useState } from 'react'
import styles from '@styles/Home.module.css'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { Router, SingletonRouter } from 'next/router'
import Link from 'next/link'

export const Footer: React.FC<{ }> = ({ }) => {
    return (
        <div className={styles.footerParent}>
            <div className={styles.footer}>
                <div>
                    <Link href={"/"}>
                        <div className={styles.headerIcon}>
                            <FontAwesomeIcon icon={faPaperPlane} /> 

                            <h3>
                                fly
                            </h3> 
                        </div>
                    </Link>

                    <p>Learn financing with us!</p>
                    <h6>{new Date().getFullYear()} FlyNZ</h6> {/* <strong>&copy;</strong> */}
                </div>
                
                <div>
                    <div>
                        <p>Fly NZ</p>
                        <a href="">Mission</a>
                        <a href="">The Team</a>
                        <a href="">About Us</a>
                        <a href="">Media Kit</a>
                        <a href="">Email Us</a>
                    </div>

                    <div>
                        <p>Social</p>
                        <a href="https://www.instagram.com/flynz_org/">Instagram</a>
                        <a href="https://discord.gg/NRBm34gM">Discord</a>
                        <a href="">Help</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer