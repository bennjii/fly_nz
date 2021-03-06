import styles from '@styles/Home.module.css'
import { SupabaseClient, User } from '@supabase/supabase-js'

import Footer from './footer'
import Header from './header'
import { useEffect, useState } from 'react'

import { Loader } from 'react-feather'
import { format } from 'timeago.js';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from './button'
import Auth from './auth'

const AdminViewport: React.FC<{ client: SupabaseClient, user: User }> = ({ client, user }) => {
    const [ usersArticles, setUsersArticles ] = useState(null);
    const router = useRouter();

    useEffect(() => {
        client
            .from('articles')
            .select()
            .eq('author_id', client.auth.user().id)
            .then(p => {
                // if(usersArticles) setUsersArticles([ ...usersArticles, ...e.data ]);
                // else setUsersArticles(e.data);

                client
                .from('ml')
                .select()
                .eq('author_id', client.auth.user().id)
                .then(e => {
                    e.data.forEach(e => e.type = "ML")
                    setUsersArticles([ ...p.data, ...e.data ]);
                })
            })

        
    }, [])

    return (
        <div className={styles.container}>
            <Header title={"Admin"} type={"admin"}/>
            
            <div className={styles.mainBody}>
                <section className={styles.adminViewportSection}>
                    <div>
                        <h1>Your Articles</h1>

                        <Button title={"Create Article"} onClick={(__e, callback) => {
                            client
                                .from('articles')
                                .insert({
                                    title: 'New Article',
                                    description: "A New Article Desc",
                                    published: false,
                                    content: [{
                                        type: 'p',
                                        content: 'Click here to begin',
                                        input: false
                                    }],
                                    author_id: user.id,
                                    creation_date: new Date()
                                })
                                .then(e => {
                                    console.error(e);

                                    setUsersArticles([ ...usersArticles, e.data[0] ]);
                                    callback();
                                })
                        }}></Button>

                        <Button title={"Create ML"} onClick={(__e, callback) => {
                            client
                                .from('ml')
                                .insert({
                                    title: 'New ML Project',
                                    description: "A New ML Desc",
                                    published: false,
                                    content: {},
                                    author_id: user.id
                                })
                                .then(e => {
                                    console.error(e);

                                    setUsersArticles([ ...usersArticles, e.data[0] ]);
                                    callback();
                                })
                        }}></Button>
                    </div>
                    

                    <div className={styles.articleTable}>
                        {
                            (!usersArticles || usersArticles == []) ?
                                <div>
                                    <Loader />
                                </div>
                            :  
                                usersArticles?.map((e, index) => {
                                    return (
                                        <div onClick={() => router.push(`/admin/${e?.type == "ML" ? 'create_ml' : 'create_article'}/${e.id}`)} key={`article-${e.id}`}>
                                            <div className={styles.tableElement}>
                                                <h4>
                                                    { e?.title }
                                                </h4>

                                                <p>
                                                    { e?.description }
                                                </p>

                                                <p>
                                                    { format(new Date(e?.creation_date)) }
                                                </p>

                                                <div className={e?.published ? styles.articlePublished : styles.articleDraft }>
                                                    { e?.published ? "Published" : "Draft" }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </section>
            </div>  
             
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', padding: '50px 0' }}>
                <h2 style={{ margin: '0' }}>{client.auth.user().email}</h2>
                <Button title={"Sign Out"} onClick={() => {
                    client.auth.signOut();
                }}></Button>
            </div>
            

            <Footer />  
        </div>
    )
}

export default AdminViewport