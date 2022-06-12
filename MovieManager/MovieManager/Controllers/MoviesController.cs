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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
           await _movieService.DeleteAsync(id);
           return Ok(id);
        }

        [HttpPut]
        public async Task<IActionResult> Update(MovieUpdate movie)
        {
            await _movieService.UpdateAsync(movie);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Create(MovieCreate movie)
        {
            var id = await _movieService.CreateAsync(movie);
            return Ok(id);
        }
    }
}
