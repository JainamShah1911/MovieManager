using MovieManager.Models;

namespace MovieManager.Services
{
    public interface IAlgoliaSearchService
    {
        Task<SearchResponseDto?> SearchAsync(SearchRequestDto dto);
        Task<string> DeleteAsync(string id);
        Task UpdateAsync(MovieUpdate movie);
        Task<string> CreateAsync(MovieCreate create);
    }
}
