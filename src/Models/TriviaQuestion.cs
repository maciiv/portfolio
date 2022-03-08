using System.Collections.Generic;

namespace Portfolio.Models
{
    public class TriviaQuestion
    {
        public string Question { get; set; }
        public IList<TriviaOption> Options { get; set; }
    }
}
