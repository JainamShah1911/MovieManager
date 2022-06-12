using Microsoft.AspNetCore.Mvc;
using MovieManager.Models;
using MovieManager.Services;

namespace MovieManager.Controllers
{
    [ApiController]
    [Route("search")]
    public class SearchController : ControllerBase
    {
        private readonly IAlgoliaSearchService _algoliaSearchService;

        public SearchController(IAlgoliaSearchService algoliaSearchService)
        {
            _algoliaSearchService = algoliaSearchService;
        }

        [HttpPost]
        public async Task<IActionResult> search(SearchRequestDto dto)
        {
            var result = await _algoliaSearchService.SearchAsync(dto);

            return Ok(result);
        }
    }
}