// pages/api/movieGenre/[genre].js
import clientPromise from "../../../lib/mongodb";
// Recherche d'un film avec paramètre : genre

/**
* @swagger
* /api/movieGenre/genre:
*   get:
*       description: Return movie by genre
*       parameters:
*            - in: header
*              name: genre
*              schema:
*                type: string
*       responses:
*           200:
*               description: Search Movie With Genre
*/

export default async function paramsGenre(req, res) {
    const { genre } = req.headers
    const client = await clientPromise;
    
    const db = client.db("sample_mflix");
    
    const movies = await db.collection("movies").find({genres: genre}).toArray();

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