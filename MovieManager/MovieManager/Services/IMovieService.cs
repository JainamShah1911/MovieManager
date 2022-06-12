using MovieManager.Models;

namespace MovieManager.Services
{
    public interface IMovieService
    {
        Task<string> DeleteAsync(string id);
        Task UpdateAsync(MovieUpdate movie);
        Task<string> CreateAsync(MovieCreate create);
    }
}
