using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Solbeg.Data.Models;

namespace Solbeg.Data
{
    public class ApplicationDbContext : DbContext
    {
        private readonly IConfiguration configuration;

        public ApplicationDbContext(IConfiguration configuration)
        {
            this.configuration = configuration;
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("Solbeg.Infrastructure"));
        }

        public DbSet<Users> Users { get; set; }
    }
}