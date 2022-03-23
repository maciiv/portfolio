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

        private static async Task<IEnumerable<Covid>> GetCovidDataAsync()
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
                    Day = int.Parse(values[4]),
                    Date = DateTime.Parse(values[2] + "-" + values[3] + "-" + values[4]),
                    Cases = decimal.Parse(values[5]),
                    Deaths = decimal.Parse(values[6]),
                    Icu = decimal.Parse(values[7]),
                    Hosp = decimal.Parse(values[8]),
                    Vax = decimal.Parse(values[9]),
                    Population = int.Parse(values[10]),
                    MedianAge = decimal.Parse(values[11]),   
                    Gdp = decimal.Parse(values[12]),
                    Life = decimal.Parse(values[13]),
                    Hdi = decimal.Parse(values[14])
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
            var continent = countries.GroupBy(c => new { c.Continent, c.Year, c.Month , c.Day}).Select(grp =>
            {
                return new Covid
                {
                    Continent = grp.FirstOrDefault().Continent,
                    Country = grp.FirstOrDefault().Continent,
                    Year = grp.FirstOrDefault().Year,
                    Month = grp.FirstOrDefault().Month,
                    Day = grp.FirstOrDefault().Day,
                    Date = grp.FirstOrDefault().Date,
                    Cases = grp.Select(c => c.Cases).Sum(),
                    Deaths = grp.Select(c => c.Deaths).Sum(),
                    Icu = grp.Select(c => c.Icu).Sum(),
                    Hosp = grp.Select(c => c.Hosp).Sum(),
                    Vax = grp.Select(c => c.Vax).Sum(),
                    Population = grp.FirstOrDefault().Population,
                    MedianAge = grp.Select(c => c.MedianAge).Average(),
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
            var world = countries.GroupBy(c => new { c.Year, c.Month, c.Day }).Select(grp =>
            {
                return new Covid
                {
                    Continent = "World",
                    Country = "World",
                    Year = grp.FirstOrDefault().Year,
                    Month = grp.FirstOrDefault().Month,
                    Day = grp.FirstOrDefault().Day,
                    Date = grp.FirstOrDefault().Date,
                    Cases = grp.Select(c => c.Cases).Sum(),
                    Deaths = grp.Select(c => c.Deaths).Sum(),
                    Icu = grp.Select(c => c.Icu).Sum(),
                    Hosp = grp.Select(c => c.Hosp).Sum(),
                    Vax = grp.Select(c => c.Vax).Sum(),
                    Population = grp.FirstOrDefault().Population,
                    MedianAge = grp.Select(c => c.MedianAge).Average(),
                    Gdp = grp.Select(c => c.Gdp).Sum(),
                    Life = grp.Select(c => c.Life).Average(),
                    Hdi = grp.Select(c => c.Hdi).Average()
                };
            }).ToList();

            return world;

        }
    }
}
