import { useEffect, useState } from 'react' 
import styles from '@styles/Home.module.css'

import client from '@components/client'
import Auth from '@components/auth'
import { AdminViewport } from '@components/admin_viewport'
import { SupabaseClient } from '@supabase/supabase-js'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const getServerSideProps = () => {
    console.log(SupabaseClient)
}

export default function Home({ usr }) {
    const session = client.auth.session()
	
	const [ cssProperties, setCssProperties ] = useState({
		"--color-primary": "#7289da",
		"--color-primary-rgb": "114, 137, 218"
	}) // Fetch User prefernces

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

    if(user) 
        return (
            <div className={styles.container}>
                <AdminViewport client={client} user={user}/>
            </div>
        ) 
    
    console.log(client.auth.user())
    return (
        <div className={styles.container}>
            <Auth callback={setUser}/>
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