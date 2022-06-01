// pages/api/movies.js
import clientPromise from "../../lib/mongodb";

/**
* @swagger
* /api/movies:
*   get:
*       description: Returns movies
*       responses:
*           200:
*               description: Hello Movies
*/


// gestionnaire de la route de l'api
export default async function handler(req, res) {
// promise : lance la et on att quand ça s'arrete
const client = await clientPromise;
// on récupère notre bdd
const db = client.db("sample_mflix");
// on créé une constante pour les films
const movies = await db.collection("movies").find({}).limit(10).toArray();
res.json({ status: 200, data: movies });
}