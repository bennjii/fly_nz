import { useEffect, useState } from 'react' 

import styles from '@styles/Home.module.css'
import articleSyles from '@styles/Article.module.css'

import Header from '@components/header'
import Footer from '@components/footer'

export default function Home() {
    const [ articleData, setArticleData ] = useState([
        
    ]);

    useEffect(() => {
        console.log(articleData)

        debounceStorageUpdate(articleData);
    }, [articleData])

    return (
        <div className={styles.container}>
            <Header title={"Admin"}/>
            
            <div>
                
            </div>

            <Footer />  
        </div>
    )
}

let lastUpdate = new Date().getTime();

const debounceStorageUpdate = (data) => {
    console.log(new Date().getTime() - lastUpdate);

    if(new Date().getTime() - lastUpdate >= 2500) {
        console.log('UPDATED!!!')

        lastUpdate = new Date().getTime();
    }else {
        setTimeout(() => debounceStorageUpdate(data), 2500);
    }
}   