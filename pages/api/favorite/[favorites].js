// pages/api/favorite/[favorites].js
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

// Ajouter l'id du film en favoris suivant le compte user

/**
* @swagger
* /api/favorite/{favorites}:
*   post:
*       description: Adding a favorite to a user
*       parameters:
*            - in: header
*              name: id_user
*              schema:
*                type: string
*            - in: header
*              name: id_movie
*              schema:
*                type: string
*       responses:
*           200:
*               description: Adding a favorite to a user
*/


// insertion de la collection Favoris
//db.posts.insertOne({ subject: "Favoris", content: "Favoris Users" })

export default async function postFav(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    
    // On récupère les paramètres du user dans une constante
    const { id_user, id_movie } = req.headers;
    
    // On rentre dans la collection (création si non existante) et on insère l'id user + l'id movie (génère un id favori automatiquement)
    const favorites = await db.collection("favorites").insertOne({id_user: ObjectId(id_user), movie_id: ObjectId(id_movie)});
    
    // Renvoie ok si le fav est ajouté sinon erreur.
    if (favorites){
        res.json({status: 201, data: "Favori ajouté à l'utilisateur"});
    }
    else{
        res.json({status: 404, data: "Erreur"});
    }
    }