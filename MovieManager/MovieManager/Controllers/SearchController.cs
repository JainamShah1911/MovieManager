using Microsoft.AspNetCore.Mvc;
using MovieManager.Models;
using MovieManager.Services;

namespace MovieManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            //var dto = new SearchRequestDto() { Top = 10, Skip = 50, Query = new Algolia.Search.Models.Search.Query() };
            var result = await _algoliaSearchService.SearchAsync(dto);

            return Ok(result);
        }
    }
}