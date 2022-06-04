// pages/api/movieGenre/[genre].js
import { ObjectId } from "bson";
import clientPromise from "../../../lib/mongodb";
// Recherche d'un film avec paramètre : genre

/**
* @swagger
* /api/movieGenre/{genre}:
*   get:
*       description: Return movie by genre
*       parameters:
*            - in: path
*              name: genre
*              schema:
*                type: string
*       responses:
*           200:
*               description: Search Movie With Genre
*/

export default async function paramsGenre(req, res) {
    const { genre } = req.query;
    const client = await clientPromise;
    
    const db = client.db("sample_mflix");
    
    const movies = await db.collection.aggregate([
        {
            $match : {
                genre: genre,
            },
        },
        {
            $group : {
                _id: ObjectId(id),
            },
        },
    ])

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