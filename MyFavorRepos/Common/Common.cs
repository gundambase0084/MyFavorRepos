using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFavorRepos.Common
{
    public class Common
    {
        /// <summary>
        /// 处理前后端的JSON数据模型
        /// </summary>
        public class jsonTool
        {
            public JObject InitJson()
            {
                JObject obj = new JObject();
                obj["code"] = 0;
                obj["msg"] = "";
                obj["data"] = new JObject();
                return obj;
            }
        }
    }
}
