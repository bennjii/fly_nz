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
import supabase from './client'

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
                                    author: {
                                        id: user,
                                        data: {
                                            name: "Template Name", // REPLACE IMMEDIATELYYYY
                                            iconURL: "",
                                        }
                                    },
                                    authorID: user.id,
                                    creation_date: new Date()
                                })
                                .then(e => {
                                    setUsersArticles([ ...usersArticles, e.data ]);
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
                                usersArticles?.map(e => {
                                    return (
                                        <div onClick={() => router.push(`/admin/create_article/${e.id}`)}>
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
                                        </div>
                                    )
                                })
                        }
                    </div>
                </section>
            </div>  
             
            <div>
                <h2>{client.auth.user().email}</h2>
                <Button title={"Sign Out"} onClick={() => {
                    client.auth.signOut();
                }}></Button>
            </div>
            

            <Footer />  
        </div>
    )
}

export { AdminViewport }