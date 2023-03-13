import axios from "axios";
import {useState} from "react";


const check_captcha=async (response) => {
    let url = '/api/board/recaptcha?response=' + response;
    const data = axios.get(url).then(data => data.data);
    console.log((await data).success);
    return ((await data).success);
}
const process_write = async (data) => {
    const cnt = fetch('/api/board/write', {
        method: 'POST', mode: 'cors',
        body: JSON.stringify(data),         //보낼때 body 로 json파일로 보냈기 때문에 받을때도  body로 가져온다.
        headers: {'Content-Type': 'application/json'}
    }).then(res => res.json());

    return (await cnt).cnt;
};


export default function Write(){
    const [title,setTitle]=useState('');
    const [userid,setUserid]=useState('onepiece');
    const [contents,setContents]=useState('');
    const [recaptcha,setRecaptcha]=useState(undefined);

    const handlewrite = async () => {
        if (grecaptcha.getResponse()
            && check_captcha(grecaptcha.getResponse())) {
            //글쓰기 작업 진행
            const data = {title: title, userid: userid, contents: contents};
            if (await process_write(data) > 0) {
                location.href = '/board/list';
            }
        }
    };
    const handleContents = (e) => {
        setContents(e.target.value);

    };
    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    return (
        <main>
            <div id="main">
                <h2>게시판 새글쓰기</h2>
                <form name="write" id="writefrm">
                    <div><label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title" onClick={handleTitle} /></div>

                    <div><label htmlFor="uid">작성자</label>
                        <input type="text" name="uid" id="uid"
                               value={userid} readOnly /></div>

                    <div><label htmlFor="contents" className="drgup">본문</label>
                        <textarea name="contents" id="contents" onChange={handleContents}
                                  rows="7" cols="55" /></div>

                    <div><label></label>
                        <div className="g-recaptcha cap" data-sitekey='6LdB4OskAAAAAJHQbds3wgd3wxTf0hCWk18sBQ-d'></div>
                    </div>

                    <div><label></label>
                        <button type="button" id="writebtn" onClick={handlewrite}>입력완료</button>
                        <button type="reset">다시입력</button>
                    </div>
                </form>
            </div>
        </main>

    )


}








