const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties");

const critic = mapProperties({
  critic: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",

});



function list() {
    return knex("movies").select("*")
    }
function list2(is_showing){
 return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .select("m.*").where({"mt.is_showing": true}).groupBy("m.movie_id");
}
function read(movie_id) {
  return knex("movies").select("*").where({movie_id}).first();
}
function readTheaters(movie_id){
  return knex("movies as m")
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("t.*")
  .groupBy("t.theater_id");
}
function readReviews(movie_id){
  return knex("movies as m")
  .join("reviews as r", "m.movie_id", "r.movie_id")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("*")
  .where({"r.movie_id": movie_id})
  .then((reviews)=>{
    return reviews.map((review)=> critic(review));
  })
  }


module.exports = {
  read,
  list,
  list2,
  readTheaters,
  readReviews,
};