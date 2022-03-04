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
    public class SchedulerController : ControllerBase
    {
        private readonly ILogger<SchedulerController> _logger;

        public SchedulerController(ILogger<SchedulerController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<Scheduler>> GetScheduleAsync()
        {
            
            var file = new StreamReader("./data/scheduler.json");
            var json = await file.ReadToEndAsync();  
            file.Close();
            return JsonConvert.DeserializeObject<IEnumerable<Scheduler>>(json);
        }

        [HttpPost]
        [Route("update")]
        public async Task<IEnumerable<Scheduler>> UpdateScheduleAsync([FromBody] Scheduler schedule)
        {
            var data = await GetScheduleAsync();
            data.FirstOrDefault(c => c.Id == schedule.Id).IsAvailable = schedule.IsAvailable;
            await System.IO.File.WriteAllTextAsync("./data/scheduler.json", JsonConvert.SerializeObject(data));
            return data;
        }
    }
}
