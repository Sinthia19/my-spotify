import Login from "../Home/Login"
import queryString from 'query-string';
import { useState, useEffect } from 'react';


const Auth = () => {
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const parsed = queryString.parse(window.location.hash);
        setAccessToken(parsed.access_token);

    }, [])

    
        return (
            <Login />
        )

}

export default Auth;