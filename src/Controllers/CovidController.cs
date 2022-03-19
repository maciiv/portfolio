using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Portfolio.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CovidController : ControllerBase
    {
        private readonly ILogger<CovidController> _logger;

        public CovidController(ILogger<CovidController> logger)
        {
            _logger = logger;
        }

        private async Task<IEnumerable<Covid>> GetCovidDataAsync()
        {
            var file = new StreamReader("./data/covid.csv");
            
            var countries = new List<Covid>();
            var i = 0;
            while (!file.EndOfStream)
            {              
                var line = await file.ReadLineAsync();               
                if (i == 0)
                {
                    i++;
                    continue;
                }
                var values = line.Split(",");
                var data = new Covid
                {
                    Continent = values[0],
                    Country = values[1],
                    Year = int.Parse(values[2]),
                    Month = int.Parse(values[3]),
                    Date = DateTime.Parse(values[2] + "-" + values[3] + "-1"),
                    Cases = decimal.Parse(values[4]),
                    Deaths = decimal.Parse(values[5]),
                    Icu = decimal.Parse(values[6]),
                    Hosp = decimal.Parse(values[7]),
                    Vax = decimal.Parse(values[8]),
                    Population = int.Parse(values[9]),
                    MedianAge = decimal.Parse(values[10]),
                    Age65 = decimal.Parse(values[11]),
                    Age70 = decimal.Parse(values[12]),
                    Gdp = decimal.Parse(values[13]),
                    Life = decimal.Parse(values[14]),
                    Hdi = decimal.Parse(values[15])
                };
                countries.Add(data);
                i++;
            }
            file.Close();

            return countries;
        }

        [HttpGet]
        [Route("countries")]
        public async Task<IEnumerable<Covid>> GetCovidCountriesAsync()
        {
            return await GetCovidDataAsync();
        }

        [HttpGet]
        [Route("continents")]
        public async Task<IEnumerable<Covid>> GetCovidContinentsAsync()
        {
            var countries = await GetCovidDataAsync();
            var continent = countries.GroupBy(c => new { c.Continent, c.Year, c.Month }).Select(grp =>
            {
                return new Covid
                {
                    Continent = grp.FirstOrDefault().Continent,
                    Country = grp.FirstOrDefault().Continent,
                    Year = grp.FirstOrDefault().Year,
                    Month = grp.FirstOrDefault().Month,
                    Date = grp.FirstOrDefault().Date,
                    Cases = grp.Select(c => c.Cases).Sum(),
                    Deaths = grp.Select(c => c.Deaths).Sum(),
                    Icu = grp.Select(c => c.Icu).Sum(),
                    Hosp = grp.Select(c => c.Hosp).Sum(),
                    Vax = grp.Select(c => c.Vax).Sum(),
                    Population = grp.FirstOrDefault().Population,
                    MedianAge = grp.Select(c => c.MedianAge).Average(),
                    Age65 = grp.Select(c => c.Age65).Sum(),
                    Age70 = grp.Select(c => c.Age70).Sum(),
                    Gdp = grp.Select(c => c.Gdp).Sum(),
                    Life = grp.Select(c => c.Life).Average(),
                    Hdi = grp.Select(c => c.Hdi).Average()
                };
            }).ToList();
            
            return continent;
        }

        [HttpGet]
        [Route("world")]
        public async Task<IEnumerable<Covid>> GetCovidWorldAsync()
        {
            var countries = await GetCovidDataAsync();
            var world = countries.GroupBy(c => new { c.Year, c.Month }).Select(grp =>
            {
                return new Covid
                {
                    Continent = "World",
                    Country = "World",
                    Year = grp.FirstOrDefault().Year,
                    Month = grp.FirstOrDefault().Month,
                    Date = grp.FirstOrDefault().Date,
                    Cases = grp.Select(c => c.Cases).Sum(),
                    Deaths = grp.Select(c => c.Deaths).Sum(),
                    Icu = grp.Select(c => c.Icu).Sum(),
                    Hosp = grp.Select(c => c.Hosp).Sum(),
                    Vax = grp.Select(c => c.Vax).Sum(),
                    Population = grp.FirstOrDefault().Population,
                    MedianAge = grp.Select(c => c.MedianAge).Average(),
                    Age65 = grp.Select(c => c.Age65).Sum(),
                    Age70 = grp.Select(c => c.Age70).Sum(),
                    Gdp = grp.Select(c => c.Gdp).Sum(),
                    Life = grp.Select(c => c.Life).Average(),
                    Hdi = grp.Select(c => c.Hdi).Average()
                };
            }).ToList();

            return world;

        }
    }
}
