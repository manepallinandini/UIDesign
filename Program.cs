using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", Options => Options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});


//Serialization 
builder.Services.AddControllersWithViews().AddNewtonsoftJson(opt =>
opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(opt =>
opt.SerializerSettings.ContractResolver = new DefaultContractResolver());



builder.Services.AddControllersWithViews();

////////////////////////
///

// services.AddControllersWithViews();
builder.Services.AddMvc(opt => opt.EnableEndpointRouting = false).AddXmlSerializerFormatters();
// In production, the Angular files will be served from this directory
//builder.Services.AddSpaStaticFiles(configuration =>
//{
//    configuration.RootPath = "ClientApp/dist";
//});

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSession();
//////////////////////


var app = builder.Build();




// Configure the HTTP request pipeline.

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();

//app.UseRouting();
app.UseSession();


//app.MapControllerRoute(
  //  name: "default",
   // pattern: "{controller}/{action=Index}/{id?}");

//app.MapFallbackToFile("index.html"); ;

//app.Run();


    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}");
    });

app.MapFallbackToFile("index.html"); ;

app.UseMvc();

app.Run();

app.UseMvc();