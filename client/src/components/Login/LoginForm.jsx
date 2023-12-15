import React, { useContext } from 'react'
import './LoginForm.css'
import { LoginContext } from '../../contexts/LoginContextProvider'

const LoginForm = () => {

    const { login } = useContext(LoginContext)

    const onLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;

        console.log(form);
        console.log(username);
        console.log(password);

        login(username, password);
    }


    return (
        <div className='form'>
            <h2 className='login-title'>Login</h2>

            <form className='login-form' onSubmit={ (e) => onLogin(e) }>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" 
                           id='username' 
                           placeholder='username' 
                           name='username' 
                           autoComplete='username' 
                           required 
                           // TODO: 아이디 저장 기능 구현
                           // FIXME: RememberUserId를 넣어줘
                           // defaultValue={}
                    />
                </div>

                <div>
                    <label htmlFor="password">password</label>
                    <input type="password"
                           id='password'
                           placeholder='password'
                           name='password'
                           autoComplete='password'
                           required
                    />
                </div>

                <button type='submit' className='btn btn--form btn-login'
                        // onClick={ () => onLogin() }
                >
                    Login
                </button>

            </form>
        </div>
    )
}

export default LoginForm