using Microsoft.AspNetCore.Mvc;
using MovieManager.Models;
using MovieManager.Services;

namespace MovieManager.Controllers
{
    [ApiController]
    [Route("movies")]
    public class MoviesController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MoviesController(IMovieService movieService)
        {
           _movieService = movieService;
        }

        /// <summary>
        /// Creates a new Movie
        /// </summary>
        /// <param name="movie">create request</param>
        [HttpPost]
        public async Task<IActionResult> Create(MovieCreate movie)
        {
            var id = await _movieService.CreateAsync(movie);
            return Ok(id);
        }

        /// <summary>
        /// Partially updates movie data as per the request
        /// </summary>
        /// <param name="movie">update request</param>
        [HttpPut]
        public async Task<IActionResult> Update(MovieUpdate movie)
        {
            await _movieService.UpdateAsync(movie);
            return Ok();
        }

        /// <summary>
        /// Deletes a movie as per the Id (objectId) provided
        /// </summary>
        /// <param name="id">objectId of movie</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
           await _movieService.DeleteAsync(id);
           return Ok(id);
        }
    }
}
