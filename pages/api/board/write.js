import Board from "../../../models/Board";

export default async (req,res)=>{
    const {title,userid,contents}=req.body;
    console.log(title,userid,contents);

    try {
        //new Board(null,title,userid,null,contents,views).insert()
        const cnt = Board.newOne(title,userid,contents).insert() //newOne 함수는 호출하여 새로운 데이터를 생성 하는 함수, insert 함수는 테이블에 추가하는 함수
            .then(result=>result);


        console.log(await cnt)
        res.status(200).json({cnt:await cnt});
    }catch (err){
        res.status(500).json(err);
    }
}