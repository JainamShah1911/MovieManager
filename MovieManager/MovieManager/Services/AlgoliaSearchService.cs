using Algolia.Search.Clients;
using Algolia.Search.Models.Search;
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
            var query = new Query()
            {
                Length = dto.Top,
                Offset = dto.Skip,
                SearchQuery = dto.SearchKeyword
            };
            try
            {
                var response = await index.SearchAsync<Movie>(query);
                return new SearchResponseDto()
                {
                    hits = response.Hits
                };
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<string> DeleteAsync(string id)
        {
            SearchIndex index = client.InitIndex(searchIndex);
            try
            {
                await index.DeleteObjectAsync(id);
                return id;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task UpdateAsync(MovieUpdate movie)
        {
            SearchIndex index = client.InitIndex(searchIndex);
            try
            {
                await index.PartialUpdateObjectAsync(movie);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<string> CreateAsync(MovieCreate create)
        {
            SearchIndex index = client.InitIndex(searchIndex);
            try
            {
                var res = await index.SaveObjectAsync(create, autoGenerateObjectId: true);
                return res.Responses.FirstOrDefault().ObjectIDs.First();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}
