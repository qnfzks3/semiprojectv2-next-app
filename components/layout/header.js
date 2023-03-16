import Link from "next/link";
import {getSession} from "next-auth/client";



// component 에는 getServerSideProps 사용 불가!
/*export async function getServerSideProps(ctx) {
    //세션 객체 가져오기 - 다른 페이지 이동
    const sess = await getSession(ctx);
   
    return {props: {sess} }

}*/
/*{문자열을 html태그로 출력-dangerouslySetInnerHTML }*/
const Header = ({menu}) => {
    console.log('header-',menu)
    return (
        <>
            <header><h1>React 프로젝트 v1</h1></header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="/member/join">회원가입</a></li>


                    {/*<li dangerouslySetInnerHTML={{__html:menu}}></li>*/}
                    <li><Link href="/member/login">로그인</Link></li>
                    
                    
                    <li><Link href="/board/list">게시판</Link></li>
                    <li><Link href="/member/myInfo">회원정보</Link></li>
                </ul>
                <hr />
            </nav>
        </>
    );
}


export default Header;