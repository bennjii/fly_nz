import React, { useEffect, useState } from 'react'
import styles from '@styles/Home.module.css'

import Head from 'next/head'
import Link from 'next/link'

import Button from '@components/button'
import axios from 'axios'

export const Search: React.FC<{ }> = ({ }) => {
    return (
        <div className={styles.search}>
            <input type="text" placeholder={"Search Stocks"}/>

            <Button title={"Search"} onClick={async (e, callback) => {
                const response = await axios.post(
                    "https://emkc.org/api/v1/piston/execute",
                    {
                        "language": lan,
                        "source": codeValue,
                        "args": []
                    },
                    { headers: {'Content-Type': 'application/json'} }
                ).then((res) => {
                    callback();
                    return res;
                })
            }}></Button>
        </div>
    )
}

export default Search