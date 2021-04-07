
import { Router } from 'next/router'

import { useState } from 'react'

import styles from '@styles/Stocks.module.css'

import Head from 'next/head'
import { Search as SearchIcon, BarChart2 } from 'react-feather'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';

import Article from '@components/article_cover'
import Header from '@components/header'
import Button from '@components/button'
import Search from '@components/search'
import Link from 'next/link';

export const StockHeader: React.FC<{ page: 'home' | 'search' | 'stocks' | 'news' }> = ({ page }) => {
  return (
    <div className={styles.navigationVertical}>
        <Link href={'/'}>
            <FontAwesomeIcon icon={faPaperPlane} /> 
        </Link>
        
        <Head>
            <title>FLY Stocks</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
            <Link href={'/search'}>
                <SearchIcon size={21} color={(page == 'search') ? "#fdfdfd" : '#515257'} />
            </Link>

            <Link href={'/stocks'}>
                <BarChart2 size={21} color={(page == 'stocks') ? "#fdfdfd" : '#515257'} strokeWidth={3}/>
            </Link>
        </div>
    </div>
  )
}

export default StockHeader