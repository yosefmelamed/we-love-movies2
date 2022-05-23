const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    //console.log(movie)
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  
  res.json({ data });
}


async function list(req, res) {
  const {is_showing} = req.query
  let data =""
 if(is_showing){
      data = await service.list2()
     } else{
      data = await service.list()
     }
  res.json({ data });
}
async function theaters(req,res){
  const {movie_Id} = req.params;
  const data = await service.readTheaters(movie_Id);
  res.json({ data })
}

async function reviews(req,res){
  const {movieId} = req.params;
  const data = await service.readReviews(movieId);
  res.json({ data })
  }


module.exports = {
read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
theaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(theaters)],
reviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(reviews)],  
list: asyncErrorBoundary(list),
};

