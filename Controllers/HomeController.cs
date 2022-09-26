using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UIDesign.Models;
using UIDesign.ServicesCSharp;

namespace UIDesign.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly APIS _apis;

        private static IHttpContextAccessor _hca { get; set; }
        private readonly IWebHostEnvironment _webHostEnvironment;

        private readonly ILogger<HomeController> _logger;

        public HomeController(IConfiguration configuration,
            IWebHostEnvironment webHostEnvironment, IHttpContextAccessor x,
            ILogger<HomeController> logger)
        {
            _hca = x;
            _configuration = configuration;
            _apis = new APIS(_hca, webHostEnvironment);
            _apis.baseAddress = _configuration.GetSection("AppSettings").GetSection("baseAddress").Value;

            _logger = logger;
        }

        [HttpGet]
        [Route("fetchdata")]

        public string fetchdata()//[FromBody] Customer u)
        {
            string s = HttpContext.Session.GetString("cccc");
            //Asynchronous programming is very popular with the help of the async and await keywords in C#.*/
            //bool rVal = await _authService.RegisterUserAsync(u);
            // return rVal;

            return "hhhhhhhhhhhhhhhhhh";
        }


        
        [HttpPost]
        [Route("register")]
        public async Task<bool> register([FromBody] User c)
        {
            bool status = await _apis.RegisterUserAsync(c);
            return status;
        }

        
        [HttpPost]
        [Route("login")]
        public async Task<string> login([FromBody] User u)
        {
            string[] rVal = await _apis.LoginAsync(u.username, u.password);
                if (rVal != null)
    {
        HttpContext.Session.SetString("username", u.username);
        HttpContext.Session.SetString("AccessToken", rVal[0]);
        HttpContext.Session.SetString("AccessTokenExpirationDate", rVal[1]);
        return JsonConvert.SerializeObject(rVal);
    }
    else
    {
        return null;
    }
        }

    }

}


/*{
    string[] rVal = await _apis.LoginAsync(u.username, u.password);
    if (rVal != null)
    {
        HttpContext.Session.SetString("username", u.username);
        HttpContext.Session.SetString("AccessToken", rVal[0]);
        HttpContext.Session.SetString("AccessTokenExpirationDate", rVal[1]);
        return JsonConvert.SerializeObject(rVal);
    }
    else
    {
        return null;
    }
}*/