// pages/api/comment/[comments].js
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

// Ajouter un commentaire à un film

/**
* @swagger
* /api/comment/comments:
*   post:
*       description: Comment on a film
*       parameters:
*            - in: header
*              name: mail
*              schema:
*                type: string
*            - in: header
*              name: id_movie
*              schema:
*                type: string
*            - in: header
*              name: comment
*              schema:
*                type: string
*       responses:
*           200:
*               description: Comment on a film
*/

// insertion du commentaire dans la fiche du film
export default async function postComment(req, res) {
const client = await clientPromise;
const db = client.db("sample_mflix");

const { mail, id_movie, comment } = req.headers;

const comments = await db.collection("comments").insertOne({email: mail, movie_id: ObjectId(id_movie), text: comment});

if (comments){
    res.json({status: 201, data: "Commentaire ajouté"});
}
else{
    res.json({status: 404, data: "Erreur"});
}
}