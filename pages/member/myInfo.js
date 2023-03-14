import axios from "axios";

//member에 myinfo를 접속하면 getServerSideProps로 데이터를 호출하고  - > 내부적으로 api/member/myinfo를 호출하고 -> mariadb(member)를 호출한다.

// 이렇게 호출한 데이터 테이블을 리턴하며 ( 호출한 테이블이름 member) 아래에 매개변수로 보내준다.

export async function getServerSideProps(ctx){
    //let {userid} = ctx.query.userid;
    let userid='abc123';
    let url = `http://localhost:3000/api/member/myinfo?userid=${userid}`;  //getServerSideProps가 데이터를 가져오는 부분

    const res=await axios.get(url);
    const member = await res.data[0];
    console.log('pg myinfo-',await member)

    return {props : {member}}
}


export default function MyInfo({member}) {
    return (
        <main>
            <h2>회원정보</h2>
            <table className="myinfo">
                <tbody>
                <tr>
                    <td>아이디</td>
                    <td>{member.userid}</td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>{member.name}</td>
                </tr>
                <tr>
                    <td>이메일</td>
                    <td>{member.email}</td>
                </tr>
                <tr>
                    <td>가입일</td>
                    <td>{member.regdate}</td>
                </tr>
                </tbody>
            </table>
        </main>
    )
}