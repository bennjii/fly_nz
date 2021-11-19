 
import client from '@components/client';

// Example of how to verify and get user data server-side.
const getUser = async (req, res) => {
    const data = JSON.parse(req.body);

    if(data.proxy_code == process.env.VERIF_PROXY) {
        const usr = await client.auth.signUp({
            email: data.email,
            password: data.password,
        }).then(u => {
            client.from('users').insert(
                {
                    id: u.user.id,
                    username: data.username,
                }
            ).then(e => {
                res.status(200).json({ response: 'clear' })
            });
        });
    }else {
        return res.status(401).json({ error: 'Invalid Proxy Code' });
    }
}

export default getUser;