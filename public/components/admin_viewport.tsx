import styles from '@styles/Home.module.css'
import { SupabaseClient, User } from '@supabase/supabase-js'

import Footer from './footer'
import Header from './header'
import { useEffect, useState } from 'react'

import { Loader } from 'react-feather'
import { format } from 'timeago.js';
import { useRouter } from 'next/router'
import Link from 'next/link'

const AdminViewport: React.FC<{ client: SupabaseClient, user: User }> = ({ client, user }) => {
    const [ usersArticles, setUsersArticles ] = useState(null);
    const router = useRouter();

    useEffect(() => {
        client
            .from('articles')
            .select()
            .eq('authorID', client.auth.user().id)
            .then(e => {
                setUsersArticles(e.data);
            })

    }, [])

    return (
        <div className={styles.container}>
            <Header title={"Admin"}/>
            
            <div className={styles.mainBody}>
                <section className={styles.homeSection}>
                    <h1>Your Articles</h1>

                    <div className={styles.articleTable}>
                        {
                            (!usersArticles) ?
                                <div>
                                    <Loader />
                                </div>
                            :  
                                usersArticles.map(e => {
                                    console.log(e);

                                    return (
                                        <Link href={`/admin/create_article/${e.id}`}>
                                            <div key={Math.random() * 10000} className={styles.tableElement}>
                                                <h4>
                                                    { e.title }
                                                </h4>

                                                <p>
                                                    { e?.description }
                                                </p>

                                                <p>
                                                    { format(new Date(e.creation_date)) }
                                                </p>

                                                <div className={e?.published ? styles.articlePublished : styles.articleDraft }>
                                                    { e?.published ? "Published" : "Draft" }
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                        }
                    </div>
                </section>
            </div>  

            <Footer />  
        </div>
    )
}

export { AdminViewport }