// pages/api/movieTitle/[title].js
import clientPromise from "../../../lib/mongodb";
// Recherche d'un film avec paramètre : titre

/**
* @swagger
* /api/movieTitle/title:
*   get:
*       description: Return movie by title
*       parameters:
*            - in: header
*              name: title
*              schema:
*                type: string
*       responses:
*           200:
*               description: Search Movie With Title
*/

export default async function paramsTitle(req, res) {
    const { title } = req.headers
    const client = await clientPromise;
    
    const db = client.db("sample_mflix");
    
    const movies = await db.collection("movies").find({title: title}).toArray();

    if(movies){
        if (movies == []){
            return res.status(203).json({ message: "Empty Response" });
        }
        res.status(200).json({ movies });
    }
    else{
        res.status(404).json({ message: "Error" });
    }
}