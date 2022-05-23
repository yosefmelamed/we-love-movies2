const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const critic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name : "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name"  
});

function read(review_id){
return knex("reviews")
  .select("*")
  .where({ review_id })
  .first()
}

function update(review_id, updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .update(updatedReview, "*");
}

function listUpdated(review_id){
  return knex("reviews")
  .join("critics", "reviews.critic_id", "critics.critic_id")
  .select("*")
  .where({ review_id})
  .first()
  .then((result) => {
    const updatedReview = critic(result);
    return {...updatedReview, critic_id: updatedReview.critic.critic_id}
  })
        }

function destroy(review_id){
  return knex("reviews")
  .where({ review_id })
  .del();
}

module.exports = {
  read,
  update,
  listUpdated,
  destroy,
}



