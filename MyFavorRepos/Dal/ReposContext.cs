using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web.Model;

namespace web.Dal
{
    public class ReposContext : DbContext
    {
        public DbSet<tbl_Left> tbl_lefts { get; set; }
        public DbSet<tbl_Right> tbl_rights { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.;Database=MyFavorRepos;User ID=test;Password=sa;");
        }
 
    }
 
}
