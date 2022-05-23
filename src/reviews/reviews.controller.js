const service = require("./reviews.service");

async function reviewExists(req, res, next){
  const {reviewId }= req.params;
  const review = await service.read(reviewId);
  if(review){
    res.locals.review = review;
    return next();
  }
  next({status:404, message: `/cannot be found/${reviewId}` })
}


async function destroy(req, res){
  const { reviewId } = req.params;
  await service.destroy(reviewId);
  res.sendStatus(204)
}


async function update(req,res,next){
const {review_id} = res.locals.review
const updateReview = req.body.data;

await service.update(review_id, updateReview);
console.log(updateReview)
const data = await service.listUpdated(review_id)
res.json({ data})
}




module.exports= {
    update: [reviewExists, update],
    delete: [reviewExists, destroy]
}
