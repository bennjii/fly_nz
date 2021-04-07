import React, { useEffect, useState } from 'react'
import styles from '@styles/Stocks.module.css'

import token from '@components/token'
import { Line } from 'react-chartjs-2'

export const StockChart: React.FC<{ data: any[], stockData: any }> = ({ data, stockData }) => {
    //if(!stockData || !data) return <></>;

    const labels = data.map(e => e.label);
    const close = data.map(e => e.close);

    const positive = stockData.change >= 0;

    return (
        <div className={`${styles.stockChart} ${positive ? styles.postiveChart : styles.negativeChart}`}>
            <Line 
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'CLOSE',
                        data: close,
                        backgroundColor: positive ? '#3a514d70' : '#4d383e70',
                        borderColor: positive ? '#47bc85' : '#cc4d48',
                        borderWidth: 1,
                        tension: 0.2,

                        pointBorderColor: positive ? '#47bc85' : '#cc4d48',
                        pointBackgroundColor: positive ? '#47bc85' : '#cc4d48',
                        pointHoverBorderWidth: 2,
                        
                        fill: true
                    }]
                }} 

                options={{
                    maintainAspectRatio: false,
                    aspectRatio: 3.5,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                          title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                          },
                          label: function(tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']];
                          }
                        },
                        backgroundColor: '#141419',
                        titleFontSize: 12,
                        titleFontColor: '#fdfdfd',
                        bodyFontColor: '#55575a',
                        bodyFontSize: 11,
                        displayColors: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                              fontSize: 12,
                              fontFamily: 'guillon',
                              fontColor: 'rgba(244,244,244,.4)',
                              maxRotation: 0.00001,
                              padding: 20,
                              labelOffset: 0,
                              callback(value, index) {
                                if (index % 1 == 0) return value;
                                return '';
                              },
                            },
                            beginAtZero: false,
                            gridLines: {
                              drawTicks: false,
                              borderColor: '#ffffff'
                            },
                          }],
                      
                          xAxes: [{
                            ticks: {
                              fontSize: 11,
                              fontFamily: 'guillon',
                              fontColor: 'rgba(244,244,244,.4)',
                              maxRotation: 0.00001,
                              padding: 20,
                              labelOffset: 20,
                              callback(value, index) {
                                if (index % 5 == 0) return value;
                                return '';
                              },
                            },
                            gridLines: {
                              tickMarkLength: 20,
                              offsetGridLines: true,
                              display: true,
                              drawTicks: false,
                              drawOnChartArea: false,
                            },
                      
                          }]
                    }
                    
                }}

                // width={null}
                // height={null}
            />
        </div>
    )
}

export default StockChart