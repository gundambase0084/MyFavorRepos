using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace web.Model
{
    [Table("tbl_Left")]
    public class tbl_Left
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Key]
        public string id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }
    }

    [Table("tbl_Right")]
    public class tbl_Right
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Key]
        public string id { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string name { get; set; }
    }
}
