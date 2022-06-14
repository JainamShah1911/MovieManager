namespace MovieManager.Models
{
    public class SearchResponseDto
    {
        public List<Movie> hits { get; set; }
        public int totalHits { get; set; }
    }
}
