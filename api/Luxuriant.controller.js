export default class LuxuriantController{

    static async apiGetLuxuriant(req, res, next){
        try{
            res.json({message: "Hello World!"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}