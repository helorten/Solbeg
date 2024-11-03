using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.OpenApi.Models;
using Solbeg.Data;
using Solbeg.Infrastructure.Repositories.Implementations;
using Solbeg.Infrastructure.Repositories.Interfaces;
using Solbeg.Services.Implementations;
using Solbeg.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);
builder.Services
    .AddControllers()
    .AddApplicationPart(typeof(Solbeg.API.Controllers.UserController).Assembly);

builder.Services.AddHttpClient("MyClient", client =>
{
    client.Timeout = TimeSpan.FromSeconds(100);
});

builder.Services.Configure<HstsOptions>(options =>
{
    options.Preload = true;
    options.IncludeSubDomains = true;
    options.MaxAge = TimeSpan.FromDays(365);
});

builder.Services.AddScoped<IUserService,UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "My API",
        Description = "API Documentation",
        Contact = new OpenApiContact
        {
            Name = "Support",
            Email = "support@example.com",
        },
        License = new OpenApiLicense
        {
            Name = "MIT",
        }
    });
});


SQLitePCL.Batteries.Init();
builder.WebHost.UseUrls("http://0.0.0.0:44389");
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<ApplicationDbContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseHsts();

app.UseStaticFiles();

app.UseCors("AllowAllOrigins");

app.UseRouting();
app.MapControllers();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.Run();

