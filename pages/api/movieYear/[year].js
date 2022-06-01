// pages/api/movieYear/[year].js
import clientPromise from "../../../lib/mongodb";
// Recherche d'un film avec paramètre : year

/**
* @swagger
* /api/movieYear/{year}:
*   get:
*       description: Return movie by year
*       parameters:
*            - in: path
*              name: year
*              schema:
*                type: integer
*       responses:
*           200:
*               description: Search Movie With Year
*/

export default async function paramsYear(req, res) {
    const { year } = req.query;
    const client = await clientPromise;
    
    const db = client.db("sample_mflix");
    
    const movies = await db.collection("movies").find({year: parseInt(year)}).toArray();

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