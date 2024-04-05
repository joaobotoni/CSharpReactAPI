using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseMySql(builder.Configuration["Database:MySql"],
    new MySqlServerVersion(new Version(8, 0, 36))));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("CorsPolicy");


app.UseAuthorization();

app.MapControllers();

app.Run();
