
import client from '@components/client'
import authStyles from '@styles/Auth.module.css'
import { useState } from 'react'

import Button from '@components/button'
import Input from '@components/input'
import { callbackify } from 'util'
import { Check } from 'react-feather';
import { Router, useRouter } from 'next/router'

const fetcher = (url, body) =>
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify(body)
  }).then((res) => res.json())

const Auth = ({ callback }) => {
    const [ authState, setAuthState ] = useState('auth-login');
    const [ authInputState, setAuthInputState ] = useState({
        email: "",
        password: "",
        username: "",
        proxy_code: "",
    });

	return (
		<div className={authStyles.auth}>
            <div className={authStyles.authBox}>
                <div className={authStyles.authLeft}>
                    {
                        (authState == 'auth-login') ?
                        <div className={authStyles.authLogin}>
                            <div>
                                <h2>FlyNZ Admin</h2>
                                <h3>To Inspire and Develop</h3>
                            </div>
                            
                            <div className={authStyles.authInput}>
                                <Input title={"EMAIL"} type="email" defaultValue={authInputState.email} onChange={(e) => setAuthInputState({ ...authInputState, email: e.target.value })}/>
                                <br />
                                <Input title={"PASSWORD"} type="password" defaultValue={authInputState.password} onChange={(e) => setAuthInputState({ ...authInputState, password: e.target.value })}/>
                                <a href="">forgot your password?</a>
                            </div>

                            <div>
                                <Button title={"Login"} onClick={() => {
                                    client.auth.signIn({
                                        email: authInputState.email,
                                        password: authInputState.password,
                                    }).then((e) => {
                                    })
                                }}/>
                                <p>Don't have an account? <a href="#" onClick={() => setAuthState('auth-signup')}>Sign Up</a></p> 
                            </div>
                        </div>
                        :
                        (authState !== "auth-email") ?
                        <div className={authStyles.authLogin}>
                            <div>
                                <h2>FlyNZ Admin</h2>
                                <h3>Create an account to start making content</h3>
                            </div>
                            
                            <div className={authStyles.authInput}>
                                <Input title={"EMAIL"} defaultValue={authInputState.email} type="email" onChange={(e) => setAuthInputState({ ...authInputState, email: e.target.value })}/>
                                <br />
                                <Input title={"USERNAME"} defaultValue={authInputState.username} type="text" onChange={(e) => setAuthInputState({ ...authInputState, username: e.target.value })}/>
                                <br />
                                <Input title={"PASSWORD"} defaultValue={authInputState.password} type="password" onChange={(e) => setAuthInputState({ ...authInputState, password: e.target.value })}/>
                                <br />
                                <Input title={"PROXY"} defaultValue={authInputState.proxy_code} type="text" onChange={(e) => setAuthInputState({ ...authInputState, proxy_code: e.target.value })}/>
                            </div>

                            <div>
                                <Button title={"Sign Up"} onClick={async (e, callback) => {
                                    if(authInputState.email && authInputState.password && authInputState.username) {
                                        fetcher('../api/verify_signup', {
                                            ...authInputState
                                        }).then(e => {
                                            if(e.error) {
                                                alert(e.error);
                                                callback();
                                            }else {
                                                setAuthState('auth-login');
                                                callback();
                                            }
                                        })
                                    }   
                                }}/>
                                <p>Already have an account? <a href="#" onClick={() => setAuthState('auth-login')}>Log in</a></p> 
                            </div>
                        </div>
                        :
                        <div className={authStyles.authLogin}>
                            <div>
                                <h2>Create an Account</h2>
                                <h3>We're so excited to see you!</h3>
                            </div>
                            
                            <div className={authStyles.authSuccess}>
                                <div className={authStyles.authSuccessCircle}>
                                    <Check color={"white"} size={64}/>
                                </div>
                                
                                <div>
                                    <h1>Success</h1>
                                    <h3>Please verify your email</h3>
                                </div>
                                
                            </div>

                            <div>
                                <p>Havent recieved an email? <a href="#" onClick={() => setAuthState('auth-login')}>Re-send</a></p> 
                            </div>
                        </div>
                    }
                </div>
                
                <div className={authStyles.authRight}>
                    {
                        //fetch(` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${client.auth.session().provider_token}`)
                    }
                </div>
            </div> 

            <div>{"\t"}</div>
        </div>
	)
}

export default Auth