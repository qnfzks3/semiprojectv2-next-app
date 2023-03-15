import {useState} from "react";
import axios from "axios";
import {handleInput} from "../../models/Utils";
import {getSession, signIn, useSession} from "next-auth/client";
import {getRawProjectId} from "next/dist/telemetry/project-id";

export async function getServerSideProps(ctx) {
    //세션 객체 가져오기 - 다른 페이지 이동
    const sess = await getSession(ctx);
    if (!sess) {
        return { // 회원정보로 이동
            redirect: {permanent: false, destination: `/member/myinfo`},
            props: {}
        }
    }
    return {props:{}}
}

export default function Login() {

    const [session, loading] = useSession();
    console.log('myinfo - ', session?.user?.userid);

    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');

    const handlelogin = async () => {
        const data = {userid: userid, passwd: passwd};

        // signIn(인증시 활용할 Credentials id, 인증시 사용할 정보)
        //const res = await signIn('userid-passwd-credentials', {
        const {error} = await signIn('userid-passwd-credentials', {
            userid, passwd,
            redirect: false
        });
        //res : 인증성공 여부를 http 상태 코드로 알려줌
        // 인증성공 : 200 실패 401
        //console.log('pg login -',await res.status);
        //error: 인증성공여부를 error로 알려줌
        //인증성공 :  null, 실패 : CredentialsSignin
        console.log('pg login -',await error);
        if(error){
            location.href ='/member/faillogin';
        }else{
            location.href = '/memeber/myinfo';
        }
    };


    return (
        <main>
            <h2>로그인</h2>
            <form name="login">
                <div><label htmlFor="uid">아이디</label>
                    <input type="text" id="uid"
                           onChange={e => handleInput(setUserid, e)} /></div>
                <div><label htmlFor="pwd">비밀번호</label>
                    <input type="password" id="pwd"
                           onChange={e => handleInput(setPasswd, e)}/></div>
                <div><label></label>
                    <button type="button" onClick={handlelogin}>로그인</button>
                </div>
            </form>
        </main>
    )
}