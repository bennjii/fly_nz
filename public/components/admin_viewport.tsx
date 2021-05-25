import styles from '@styles/Home.module.css'
import { SupabaseClient, User } from '@supabase/supabase-js'

import Footer from './footer'
import Header from './header'

import Button from './button'

const AdminViewport: React.FC<{ client: SupabaseClient, user: User }> = ({ client, user }) => {


    return (
        <div className={styles.container}>
            <Header title={"Admin"}/>
            
            <body className={styles.mainBody}>
                <section className={styles.homeSection}>
                <h1>{user.email}</h1>

                <Button title={"Log Out"} onClick={() => {
                    client.auth.signOut();
                }} />

                </section>
            </body>  

            <Footer />  
        </div>
    )
}

export { AdminViewport }