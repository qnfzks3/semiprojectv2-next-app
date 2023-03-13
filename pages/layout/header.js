
import Link from "next/link";
import MyInfo from "../member/MyInfo";

const Header = () => {
    return (
        <>
            <header><h1>React 프로젝트 v1</h1></header>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="/member/Join">회원가입</a></li>
                    <li><Link href="/member/Login">로그인</Link></li>
                    <li><Link href="/board/list">게시판</Link></li>
                    <li><Link href="/member/MyInfo">회원정보</Link></li>
                </ul>
                <hr />
            </nav>
        </>
    );
}


export default Header;
