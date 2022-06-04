using MovieManager.Models;

namespace MovieManager.Services
{
    public interface IAlgoliaSearchService
    {
        Task<SearchResponseDto?> SearchAsync(SearchRequestDto dto);
    }
}
