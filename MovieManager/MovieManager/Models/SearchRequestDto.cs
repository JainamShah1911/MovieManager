﻿using Algolia.Search.Models.Search;

namespace MovieManager.Models
{
    public class SearchRequestDto
    {
        public string SearchKeyword { get; set; }
        public int Top { get; set; }
        public int? Skip { get; set; }
        public Query Query { get; set; }

        public SearchRequestDto()
        {
            SearchKeyword = "";
            Top = 25;
            Skip = 0;
            Query = new Algolia.Search.Models.Search.Query();
        }
    }
}
