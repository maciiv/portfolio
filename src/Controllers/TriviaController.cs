using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Portfolio.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TriviaController : ControllerBase
    {
        private readonly ILogger<TriviaController> _logger;

        public TriviaController(ILogger<TriviaController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Trivia>> GetTriviaAsync()
        {
            var file = new StreamReader("./data/trivia.json");
            var json = await file.ReadToEndAsync();
            file.Close();
            return JsonConvert.DeserializeObject<IEnumerable<Trivia>>(json);
        }

        [HttpGet]
        [Route("questions/{category}")]
        public async Task<IEnumerable<TriviaQuestion>> GetTriviaQuestionsAsync([FromRoute] string category)
        {
            var data = await GetTriviaAsync();
            var trivia = data.FirstOrDefault(c => c.Category == category);
            return trivia?.Questions;
        }

        public async Task<IEnumerable<TriviaWinner>> GetTriviaWinnersAsync()
        {
            var file = new StreamReader("./data/triviaWinners.json");
            var json = await file.ReadToEndAsync();
            file.Close();
            return JsonConvert.DeserializeObject<IEnumerable<TriviaWinner>>(json);
        }

        [HttpPost]
        [Route("winners")]
        public async Task<IEnumerable<TriviaWinner>> UpdateTriviaWinnersAsync([FromBody] TriviaWinner winner)
        {
            var data = await GetTriviaWinnersAsync();
            var allData = data.Append(winner);
            var top = data.OrderByDescending(c => c.Score).Take(5);

            await System.IO.File.WriteAllTextAsync("./data/triviaWinners.json", JsonConvert.SerializeObject(top));
            return top;
        }
    }
}
