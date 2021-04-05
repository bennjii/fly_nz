
import { Router } from 'next/router'
import axios from 'axios'
import { useState, Dispatch, SetStateAction, useEffect } from 'react'

import styles from '@styles/Stocks.module.css'
import { Search as SearchIcon, BarChart2, Plus } from 'react-feather'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faPaperPlane, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';

import Button from '@components/button'
import Search from '@components/search'
import StockHeader from '@components/stock_header';

export default function Stocks() {
  const [ stockInfo, setStockInfo ] = useState(null);
  const [ page, setPage ]: ["home" | "search" | "stocks" | "news", Dispatch<SetStateAction<"home" | "search" | "stocks" | "news">>] 
    = useState("search");

  
    (async () => {
      if(!process.browser) return;
      const ref = JSON.parse(localStorage.getItem('data-ref'));

      console.log(ref);
      
      // \/  Contrapositive
      if(!(ref?.data.length !== undefined && ref !== null && ref !== undefined && ref !== [] && ref !== 'null' && ref !== 'undefined')) {
        // Invalid Data
        const ret = await axios.get(`https://cloud.iexapis.com/stable/ref-data/iex/symbols?token=pk_a1feb5ae49654f7cb82aaa9bd1fa3a77`);
        console.log(ret);
        localStorage.setItem('data-ref', JSON.stringify(ret));
      }
    })();
  
  useEffect(() => {
    
  }, [page])

  return (
    <div className={styles.darkContainer}>
      <StockHeader page={page}/>

      <body className={styles.mainStockBody}>
        <div className={styles.bodyHeader}>
          <div>
            <div>
              <h1>{page.replace(/^\w/, (c) => c.toUpperCase())}</h1>
            </div>

            <div>
              <Search callback={(response) => {
                setStockInfo(response)
              }}/>  
            </div>
          </div>
        </div>

        <section className={styles.searchStocks}>
          <div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1>{ stockInfo?.data?.symbol ?? "..." }</h1>
                <Button title={"Add to Watchlist"} Icon={Plus}></Button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                <p>{ stockInfo?.data?.companyName }</p>
                
                <div className={(stockInfo?.data?.changePercent >= 0) ? styles.changePositive : styles.changeNegative }>
                  { stockInfo?.data?.changePercent >= 0 ? '+' : '-' }{ Math.round(Math.abs(stockInfo?.data?.changePercent) * 100) / 100 }%
                </div>
              </div>
            </div>

            <div>
              {/* Graph and Other Information */}
            </div>
          </div>
          
        </section>
        
      </body>  
         
    </div>
  )
}