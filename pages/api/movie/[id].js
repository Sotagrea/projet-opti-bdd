// pages/api/movie/[id].js
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

// Recherche d'un film à l'aide de son ID

/**
* @swagger
* /api/movie/{id}:
*   get:
*       description: Return movie by id
*       parameters:
*            - in: path
*              name: id
*              required: true
*              schema:
*                type: string
*       responses:
*           200:
*               description: Search Movie With ID
*/

export default async function searchId(req, res) {

    // Récupération param du swagger
    const { id } = req.query;
    const client = await clientPromise;

    // On se positionne dans la table des movies
    const db = client.db("sample_mflix");

    // On créé une constante qui va récupérer le film suivant l'id
    const movie = await db.collection("movies").find({_id: ObjectId(id) }).toArray();

    // Affichage de la constante ou non suivant le paramètre dans le swagger
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