namespace MovieManager.Models
{
    public class Movie
    {
        public string ObjectId { get; set; }
        public string Title { get; set; }
        public int Rating { get; set; }
        public int Year { get; set; }
        public string Image { get; set; }
        public List<string> Genre { get; set; }
        public List<string> Alternative_Titles { get; set; }
    }
}
