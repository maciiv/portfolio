using System;

namespace Portfolio.Models
{
    public class Covid
    {
        public string Continent { get; set; }
        public string Country { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public DateTime Date { get; set; }
        public decimal Cases { get; set; }
        public decimal Deaths { get; set; }
        public decimal Icu { get; set; }
        public decimal Hosp { get; set; }
        public decimal Vax { get; set; }
        public int Population { get; set; }
        public decimal MedianAge { get; set; }
        public decimal Gdp { get; set; }
        public decimal Life { get; set; }
        public decimal Hdi { get; set; }
    }
}
