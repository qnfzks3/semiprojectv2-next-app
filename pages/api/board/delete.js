import {AxiosHeaders as Board} from "axios";

export default async (req,res) =>{
    const {bno}=req.query;

    try {
        const cnt=new Board().delete(bno).then(result=>result);
        //res.status(200).json({'cnt':await cnt});
        res.redirect(301,'/board/list')           //301은 다른 곳으로 이동할수 있게끔함
        
    }catch (err){
        res.status(500).json(err);
    }

}

