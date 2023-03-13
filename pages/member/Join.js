import handleInput, {process_submit} from "../../models/Utils";
import {useState} from "react";


export default function Join() {
    const [userid,setUserid]=useState('');
    const [passwd,setPasswd]=useState('');
    const [repwd,setRepwd]=useState('');
    const [name,setName]=useState('')
    const [email,setEmail]=useState('');


    const handleJoin = async () => {
        if (grecaptcha.getResponse()
            && await check_captcha(grecaptcha.getResponse())) {
            //회원가입 작업 진행
            const data = {title: title, userid: userid, contents: contents};
            if (await process_submit('/api/board/join', data) > 0) {
                location.href = '/board/login';
            }
        }
    };



    return (
        <main>
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>

            <h2>회원가입</h2>
            <form name="join">
                <div><label htmlFor="uid">아이디</label>
                    <input type="text" name="uid" id="uid" /></div>
                <div><label htmlFor="pwd">비밀번호</label>
                    <input type="password" name="pwd" id="pwd" /></div>
                <div><label htmlFor="repwd">비밀번호 확인</label>
                    <input type="password" name="repwd" id="repwd" onClick={e=>handleInput(setPasswd,e)} /></div>
                <div><label htmlFor="name">이름</label>
                    <input type="text" name="name" id="name" /></div>
                <div><label htmlFor="email">이메일</label>
                    <input type="text" name="email" id="email" onClick={e=>handleInput(setEmail,e)} /></div>
                <div><label></label>
                    <div className="g-recaptcha cap" data-sitekey='6LdB4OskAAAAAJHQbds3wgd3wxTf0hCWk18sBQ-d'></div>
                </div>

                <div><label></label>
                    <button type="button" onClick={handleJoin}>입력완료</button>
                    <button type="reset">다시입력</button>
                </div>
            </form>
        </main>
    )
}