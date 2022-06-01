// pages/api/movie/[id].js
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

// Recherche d'un film à l'aide de son ID

/**
* @swagger
* /api/movie/id:
*   get:
*       description: Return movie by id
*       parameters:
*            - in: header
*              name: id
*              schema:
*                type: string
*       responses:
*           200:
*               description: Search Movie With ID
*/

export default async function searchId(req, res) {
    const { id } = req.headers
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movie = await db.collection("movies").find({_id: ObjectId(id) }).toArray();

    if(movie){
        res.json({ movie });
    }
    else if(id == null){
        res.json({status: 500, data: "Id manquant"});
    }
    else{
        res.json({status: 404, data: "Error"});
    }
}