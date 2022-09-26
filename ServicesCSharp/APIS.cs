using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using UIDesign.Models;

namespace UIDesign.ServicesCSharp
{
    public class APIS
    {
        public string baseAddress { get; set; }
        private readonly IHttpContextAccessor _contextAccessor;
         
        public APIS(IHttpContextAccessor contextAccessor , IWebHostEnvironment e)
        {
            _contextAccessor = contextAccessor;
        }

        public async Task<bool> RegisterUserAsync(User e)
        {

            var model = new User
            {
                username = e.username,
                email = e.email,
                phone = e.phone,
                password = e.password,
                appcode = "registerConn"
            };
            using (HttpClient client = new HttpClient())
            {

                client.BaseAddress = new Uri(baseAddress);     //APIGateway_BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                string serializedObject = JsonConvert.SerializeObject(model);
                HttpContent contentPost = new StringContent(serializedObject, Encoding.UTF8, "application/json");
                var response = await client.PostAsync("auth/register", contentPost);
                //****************************************************************************************************************************** 

                if (response.IsSuccessStatusCode)
                {

                    return true;
                }
            }
            return false;
        }

        public async Task<string[]> LoginAsync(string username, string password)
        {

            try
            {
                //********************************************************************************************************
                HttpClient client = new HttpClient();
                var model = new User
                {
                    username = username,
                    password = password,

                    appcode = "registerConn"
                };



                client.BaseAddress = new Uri(baseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                string serializedObject = JsonConvert.SerializeObject(model);
                HttpContent contentPost = new StringContent(serializedObject, Encoding.UTF8, "application/json");
                var response = await client.PostAsync("auth/login", contentPost);

                //*****************************************************************************************************************888

                // var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var handler = new JwtSecurityTokenHandler();
                    JToken jwtDynamic = JsonConvert.DeserializeObject<dynamic>(content);
                    string[] accessToken = new string[] { "", "", "" };
                    accessToken[0] = jwtDynamic.Value<string>("auth_token");
                    var token = handler.ReadJwtToken(accessToken[0]);
                    var accessTokenExpiration = TimeZoneInfo.ConvertTimeFromUtc(token.ValidTo, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                    accessToken[1] = accessTokenExpiration.ToString();
                    _contextAccessor.HttpContext.Session.SetString("AccessTokenExpirationDate", accessTokenExpiration.ToString());
                    return accessToken;
                }
                else { return null; }
            } // Closing try block
            catch (Exception ex) { return null; }
            finally { }
        }
    }
}
