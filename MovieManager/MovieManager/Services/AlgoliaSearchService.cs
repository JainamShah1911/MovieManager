using Algolia.Search.Clients;
using MovieManager.Models;

namespace MovieManager.Services
{
    public class AlgoliaSearchService : IAlgoliaSearchService
    {
        private IConfiguration _configuration;
        private readonly SearchClient client;
        private readonly string searchIndex;

        public AlgoliaSearchService(IConfiguration configuration)
        {
            _configuration = configuration;
            var keys = _configuration.GetSection("AlgoliaKeys");
            client = new SearchClient(keys["ApplicationId"], keys["APIKey"]);
            searchIndex = keys["index"];
        }

        public async Task<SearchResponseDto?> SearchAsync(SearchRequestDto dto)
        {

            SearchIndex index = client.InitIndex(searchIndex);
            dto.Query.Length = dto.Top;
            dto.Query.Offset = dto.Skip;
            try
            {
                var response = await index.SearchAsync<object>(dto.Query);
                return new SearchResponseDto()
                {
                    hits = response.Hits
                };
            }
            catch(Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
