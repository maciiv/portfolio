using System.Collections.Generic;

namespace Portfolio.Models
{
    public class Trivia
    {
        public string Category { get; set; }
        public IList<TriviaQuestion> Questions { get; set; }
    }
}
