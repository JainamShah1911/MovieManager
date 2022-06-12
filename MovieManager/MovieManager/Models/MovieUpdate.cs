namespace MovieManager.Models
{
    public class MovieUpdate
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public List<string> Genre { get; set; }
        public List<string> Alternative_Titles { get; set; }
    }
}
