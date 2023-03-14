
import {useState} from "react";
import axios from "axios";
import Member from "../../../models/Member";

//1 여기서 export 함수 만드는걸로 시작


export default async (req,res)=>{




    const [userid,passwd]=[req.query.userid , req.query.passwd];  // url 주소로 넘겨 받아서 사용한다.

    try {
        const member = new Member().login(userid,passwd).then(result=>result);



        const result = (await member)[0];
        const data = {cnt : parseInt(await result.cnt), name:await result.name , email:await result.email}
        console.log('api login -',data);
        res.status(200).json(data); //정상 연결되면 member를 json파일로 나타내어라
    }catch (err){
        res.status(500).json(err);
    }


}



