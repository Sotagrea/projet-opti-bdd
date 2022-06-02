// pages/api/comment/[comments].js
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

// Ajouter un commentaire à un film

/**
* @swagger
* /api/comment/{comments}:
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

// On rentre dans la table des films
const db = client.db("sample_mflix");

// On récupère les paramètres du swagger
const { mail, id_movie, comment } = req.headers;

// On insère le commentaire dans la table comments avec l'email du user, l'id du film et son commentaire.
const comments = await db.collection("comments").insertOne({email: mail, movie_id: ObjectId(id_movie), text: comment});

// Renvoie ok si le com est ajouté sinon erreur.
if (comments){
    res.json({status: 201, data: "Commentaire ajouté"});
}
else{
    res.json({status: 404, data: "Erreur"});
}
}