import { useEffect, useState } from 'react' 
import styles from '@styles/Home.module.css'

import client from '@components/client'
import Auth from '@components/auth'
// import { AdminViewport } from '@components/admin_viewport'
import { SupabaseClient } from '@supabase/supabase-js'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import supabase from '@components/client'
import dynamic from 'next/dynamic'

const AdminViewport = dynamic(() => import('../public/components/admin_viewport'), { ssr: false })

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const Index = () => {
    if(!process.browser) return null; 
    const session = client.auth.session()
	
	const [ cssProperties, setCssProperties ] = useState({
		"--color-primary": "#7289da",
		"--color-primary-rgb": "114, 137, 218"
	}) // Fetch User preferences

	const [ user, setUser ] = useState(client.auth.user());
	const [ authView, setAuthView ] = useState('sign_in')

	useEffect(() => {
		if(session)
			fetcher('/api/getUser', session.access_token).then(e => {
				setUser(e);
			});
		
		const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
			setUser(client.auth.user());
		})
	}, []);

    if(client.auth.user() || user)
        return (
            <AdminViewport client={client} user={user}/>
        ) 
    else 
        return (
            <div className={styles.container}>
                <Auth callback={setUser}/>
            </div>
        )    

    return null;
}


let lastUpdate = new Date().getTime();

const debounceStorageUpdate = (data) => {
    if(new Date().getTime() - lastUpdate >= 2500) {

        lastUpdate = new Date().getTime();
    }else {
        setTimeout(() => debounceStorageUpdate(data), 2500);
    }
}   

export default Index;