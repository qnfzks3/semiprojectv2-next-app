
import {useState} from "react";
import {handleInput,check_captcha, hashPassword, process_submit} from "../../components/Utils";
import {getSession} from "next-auth/client";
import Layout from "../../components/layout/layout";
import Home from "../index";



export async function getServerSideProps(ctx) {
    //세션 객체 가져오기 - 다른 페이지 이동
    const sess = await getSession(ctx);
    if (sess) {
        return { // 로그인한 경우 회원 정보로 이동
            redirect: {permanent: false, destination: `/member/myinfo`},
            props: {}
        }
    }
    return {props:{}}
}


export default function Join() {

    const [userid, setUserid] = useState('');
    const [passwd, setPasswd] = useState('');
    const [repwd, setRepwd] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    console.log(process.env.SITE_KEY);

    const handlejoin = async () => {
        if (grecaptcha.getResponse() && await check_captcha(grecaptcha.getResponse())) {
            // 회원가입 작업 진행
            //const data = {userid: userid, passwd: passwd, name: name, email: email};

            let hshpwd = await hashPassword(passwd); // 암호를 해시화 함
            const data = {userid: userid, passwd: await hshpwd, name: name, email: email};
            if (await process_submit('/api/member/join', data) > 0) {
                location.href = '/member/login';
            }
        }
    };
    return (
        <main>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <h2>회원가입</h2>
            <form name="join">
                <div><label htmlFor="uid">아이디</label>
                    <input type="text" name="uid" id="uid"
                           onChange={e => handleInput(setUserid, e)}/></div>
                <div><label htmlFor="pwd">비밀번호</label>
                    <input type="password" name="pwd" id="pwd"
                           onChange={e => handleInput(setPasswd, e)}/></div>
                <div><label htmlFor="repwd">비밀번호 확인</label>
                    <input type="password" name="repwd" id="repwd"
                           onChange={e => handleInput(setRepwd, e)}/></div>
                <div><label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name"
                           onChange={e => handleInput(setName, e)}/></div>
                <div><label htmlFor="email">이메일</label>
                    <input type="text" name="email" id="email"
                           onChange={e => handleInput(setEmail, e)}/></div>
                <div><label></label>
                    <div className="g-recaptcha cap"
                         data-sitekey='6LdG4OskAAAAAMgMFOSHk_hTcglHx9m1Z9qBuR6y'></div>
                </div>
                <div><label></label>
                    <button type="button" onClick={handlejoin}>입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </main>
    )
}


Join.getLayout=(page)=>(
    <Layout meta={{title:'회원가입'}}>
        {page}
    </Layout>

)




