
import { Router } from 'next/router'
import axios from 'axios'
import { useState, Dispatch, SetStateAction, useEffect } from 'react'

import styles from '@styles/Stocks.module.css'
import { Search as SearchIcon, BarChart2, Plus, ChevronDown, ChevronUp } from 'react-feather'

import Button from '@components/button'
import Search from '@components/search'
import StockHeader from '@components/stock_header';
import StockChart from '@components/stock_chart'

export default function Stocks() {
    const [ stockInfo, setStockInfo ] = useState(null);
    const [ chartInfo, setChartInfo ] = useState(null);

    const [ page, setPage ]: ["home" | "search" | "stocks" | "news", Dispatch<SetStateAction<"home" | "search" | "stocks" | "news">>] = useState("search");

    // Asynchronous Fetch
    (async () => {
        if(!process.browser) return;
        const ref = JSON.parse(localStorage.getItem('data-ref'));

        // \/  Contrapositive
        if(!(ref?.data.length !== undefined && ref !== null && ref !== undefined && ref !== [] && ref !== 'null' && ref !== 'undefined')) {
        // Invalid Data
        const ret = await axios.get(`https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_a1feb5ae49654f7cb82aaa9bd1fa3a77`);
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
                <Search stockInfo={(response) => {
                    setStockInfo(response)
                }} chartInfo={(response) => {
                    setChartInfo(response)
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
                        
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                                <p>{ stockInfo?.data?.companyName }</p>
                                
                                <div className={(stockInfo?.data?.changePercent >= 0) ? styles.changePositive : styles.changeNegative }>
                                    {/* { stockInfo?.data?.changePercent >= 0 ? <ChevronUp size={3}/> : <ChevronDown size={18}/> } */}
                                { stockInfo?.data?.changePercent >= 0 ? '+' : '-' }{ Math.round(Math.abs(stockInfo?.data?.changePercent) * 100) / 100 }%
                                </div>
                            </div>
                            
                            <div className={(stockInfo?.data?.changePercent >= 0) ? styles.changePositive : styles.changeNegative}>
                                
                                { stockInfo?.data?.latestPrice } 
                                &nbsp;&nbsp;
                                {/* { stockInfo?.data?.change >= 0 ? "+" : "-" } */}
                                { stockInfo?.data?.changePercent >= 0 ? <ChevronUp size={18}/> : <ChevronDown size={18}/> }
                                {stockInfo?.data?.change}
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Graph and Other Information */}
                        {
                            (chartInfo !== null && stockInfo !== null) ?
                            <StockChart data={chartInfo.data} stockData={stockInfo.data} />    
                            :
                            <></>
                        }          
                    </div>

                    <div>
                        <p>POWERED BY IEXCLOUD</p>
                    </div>
                </div>            
            </section>
            
        </body>  
            
        </div>
    )
}