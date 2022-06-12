using MovieManager.Models;

namespace MovieManager.Services
{
    public class MoviesService : IMovieService
    {
        private readonly IAlgoliaSearchService _algoliaSearchService;

        public MoviesService(IAlgoliaSearchService algoliaSearchService)
        {
            _algoliaSearchService = algoliaSearchService;
        }

        public async Task<string> CreateAsync(MovieCreate create)
        {
            return await _algoliaSearchService.CreateAsync(create);
        }

        public async Task UpdateAsync(MovieUpdate movie)
        {
            await _algoliaSearchService.UpdateAsync(movie);
        }

        public async Task<string> DeleteAsync(string id)
        {
            return await _algoliaSearchService.DeleteAsync(id);
        }        
    }
}
