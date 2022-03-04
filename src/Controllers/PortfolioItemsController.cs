using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Portfolio.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PortfolioItemsController : ControllerBase
    {
        private readonly ILogger<PortfolioItemsController> _logger;

        public PortfolioItemsController(ILogger<PortfolioItemsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<PortfolioItems>> GetPortfolioItemsAsync()
        {
            var file = new StreamReader("./data/portfolioItems.json");
            var json = await file.ReadToEndAsync();
            file.Close();
            return JsonConvert.DeserializeObject<IEnumerable<PortfolioItems>>(json);
        }
    }
}
