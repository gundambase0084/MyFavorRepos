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
            //TODO: 你的appsettings.json里面已经放置了链接字符串，但是代码里面仍然是hardcode，这个需要优化一下
            optionsBuilder.UseSqlServer(@"Server=.;Database=MyFavorRepos;User ID=sa;Password=P5ssw0rd@123;");
        }
 
    }
 
}
