import Board from "/models/Board";

export default async (req, res) => {
    let [ cpg, ftype, fkey ] = [ req.query.cpg, req.query.ftype, req.query.fkey ];
    let stnum = (cpg - 1) * 25;  // 지정한 페이지 범위 시작값 계산     -- 마리아 디비의 경우는 +1은 빼야한다.
    //oracle = (cpg - 1) * 25 + 1
    //mariadb = (cpg - 1) * 25

    try {
        const rowData = new Board().select(stnum, ftype, fkey)
            .then((result) => result);
        res.status(200).json(await rowData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}






