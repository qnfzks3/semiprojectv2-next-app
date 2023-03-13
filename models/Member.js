const mariadv = require('../models/MariaDB');

let membersql = {
    insertsql : ' insert into member (mno,userid,passwd,name,email) ' +
        ' values (mno.nextval, :1,:2,:3,:4) ',
    loginsql : ' select count(userid) cnt from member ' +
        ' where userid = :1 and passwd = :2 ',
    selectOne: ' select mno,userid,name,email, ' +
        ` date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate ` +
        ' from member where userid = :1 '
}

class Member {

    constructor(userid, passwd, name, email) {
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }

    // 회원정보 저장
    async insert() {
        let conn = null;
        let params = [this.userid, this.passwd, this.name, this.email];
        let result=-1;


        try {
            conn = await mariadb.makeConn();
            let result = await conn.query(membersql.insertsql, params);
            await conn.commit();
            if (result.rowsAffected > 0) result =result.affectedRows;
        } catch (ex) {
            console.log(ex);
        } finally {
            await mariadb.closeConn(conn);
        }
        return result;
    }

    async login(uid, pwd) {  // 로그인 처리
        let conn = null;
        let params = [uid, pwd];
        let result = 0;

        try {
            conn = await mariadb.makeConn();
            let result = await conn.query(membersql.loginsql, params);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

    async selectOne(uid) {  // 아이디로 검색된 회원의 모든 정보 조회
        let conn = null;
        let params = [uid];
        let result = -1;

        try {
            conn = await mariadb.makeConn();
            let result = await conn.query(membersql.selectOne, params);

        } catch (e) {
            console.log(e);
        } finally {
            await mariadb.closeConn();
        }

        return result;
    }

};

module.exports = Member;