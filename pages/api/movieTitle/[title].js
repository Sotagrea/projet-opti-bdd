// pages/api/movieTitle/[title].js
import clientPromise from "../../../lib/mongodb";
// Recherche d'un film avec paramètre : titre

/**
* @swagger
* /api/movieTitle/{title}:
*   get:
*       description: Return movie by title
*       parameters:
*            - in: path
*              name: title
*              schema:
*                type: string
*       responses:
*           200:
*               description: Search Movie With Title
*/

export default async function paramsTitle(req, res) {

    // Récupération du titre rentré dans le swagger
    const { title } = req.query;

    const client = await clientPromise;
    
    // On se place dans la table movies
    const db = client.db("sample_mflix");
    
    // On créé une constante qui va récupérer le(s) film(s) suivant le titre
    const movies = await db.collection("movies").find({title: title}).toArray();

    // Affichage de la constante ou non suivant le paramètre dans le swagger
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