using Solbeg.Data;

var builder = WebApplication.CreateBuilder(args);

SQLitePCL.Batteries.Init();

builder.Services.AddDbContext<ApplicationDbContext>();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

