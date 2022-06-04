using dotenv.net;
using Newtonsoft.Json;
using Project_BetHard.Models.Matches;
using Project_BetHard.Models.UtilModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Project_BetHard.Util
{
    public class ApiCalls
    {

        // Task<List<Match>> är returtypen
        public async static Task<List<Match>> GetBrazilMatches()  // Lista av matches som returneras en lista av tasks.
        {
            HttpClient client = new HttpClient();

            string uri = "https://api.football-data.org/v4/competitions/BSA/matches";
            var envVars = DotEnv.Read();
            string token = envVars["FOOTBALL_TOKEN"];
            Debug.WriteLine("TOKEN " + token);
            client.DefaultRequestHeaders.Add("X-Auth-Token", token);

            var response = await client.GetAsync(uri);
            response.EnsureSuccessStatusCode();
            string responseContent = await response.Content.ReadAsStringAsync(); // Läs in i "raw-format" och sparar i en string

            //Gör om till csharp-objekt
            var jsonObject = JsonConvert.DeserializeObject<MatchesHolder>(responseContent); //Yttersta lagret har inte ett namn i JSON-filer.

            return jsonObject.Matches; //returnerar en lista
        }
    }
}
