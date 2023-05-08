import { useRef, useState, useEffect } from "react";
import{ faCheck, faTimes, faInfoCircle } from "@fortawsome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const useRef = useRef();  /*for the user input, it will allow to set the focus on the user input*/
    const errRef = useRef();  /*for an error reference, so we can focus on that if we get an error*/

    /*the state for the user field*/
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false); /*name validates ot not*/
    const [userFocus, setUserFocus] = useState(false); /*whether we have an input field or not*/

    /*the state for the password*/
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    /*the state for the matching password field*/
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false); 
    const [matchFocus, setMatchFocus] = useState(false);

    /*the state for a possible error message*/
    const [errMsg, setErrMsg] = useState('');
    /*the state if we successfully submit the registration form or not*/
    const [success, setSuccess] = useState(false); 

    useEffect(() => {
        useRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd; /*comparing psw to the match psw state*/
        setValidMatch(match);
    }, [pwd, matchPwd]) /*psw state in the dependancy array*/

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                <label htmlFor="username">
                    Username:
                </label>
            </form>
        </section>
    )
}

export default Register