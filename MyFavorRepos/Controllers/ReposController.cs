using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using web.Dal;
using web.Model;
using static MyFavorRepos.Common.Common;

namespace MyFavorRepos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReposController : Controller
    {
        /// <summary>
        /// 初始处理
        /// </summary>
        /// <returns></returns>
        [HttpPost("[action]")]
        public string ApplicationStarted()
        {
            JObject result = new jsonTool().InitJson();
            Stream reqStream = this.HttpContext.Request.Body;
            string text = "";
            List<JObject> datas = new List<JObject>();
            try
            {
                using (StreamReader reader = new StreamReader(reqStream))
                {
                    text = reader.ReadToEnd();
                    datas = JsonConvert.DeserializeObject<List<JObject>>(text);
                }
                if (datas == null || datas.Count == 0)
                {
                    result["code"] = 1;
                    result["msg"] = "nodata";
                    return result.ToString();
                }
                using (ReposContext dx = new ReposContext())
                {
                    dx.tbl_lefts.RemoveRange(dx.tbl_lefts.ToList());
                    dx.tbl_rights.RemoveRange(dx.tbl_rights.ToList());
                    dx.SaveChanges();

                    foreach (JObject data in datas)
                    {
                        tbl_Left _obj = new tbl_Left();
                        _obj.id = data["id"] == null ? "" : data["id"].ToString();
                        _obj.name = data["name"] == null ? "" : data["name"].ToString();
                        dx.tbl_lefts.Add(_obj);
                    }
                    dx.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                result["code"] = 1;
                result["msg"] = ex.Message;
            }
            return result.ToString();
        }

        /// <summary>
        /// 左右移动按钮处理
        /// </summary>
        /// <returns></returns>
        [HttpPost("[action]")]
        public string MoveButtonClick()
        {
            JObject result = new jsonTool().InitJson();
            Stream reqStream = this.HttpContext.Request.Body;
            string text = "";
            JObject datas = new JObject();
            try
            {
                using (StreamReader reader = new StreamReader(reqStream))
                {
                    text = reader.ReadToEnd();
                    datas = JsonConvert.DeserializeObject<JObject>(text);
                }
                if (datas == null || datas["selectedItems"] == null || !datas["selectedItems"].HasValues)
                {
                    result["code"] = 1;
                    result["msg"] = "nodata";
                    return result.ToString();
                }

                using (ReposContext dx = new ReposContext())
                {
                    List<JObject>  newdatas = new List<JObject>();
                    newdatas = JsonConvert.DeserializeObject<List<JObject>>(datas["selectedItems"].ToString());
                    //todo: 下面这部分属于业务逻辑，应该在解决方案中另外创建一个项目叫做 MyFavorRepos.Biz，然后将业务逻辑放入这个中间层项目
                    if (datas["type"].ToString() == "left")
                    {
                        List<string> keys = newdatas.Select(x => x["id"].ToString()).ToList();
                        List<tbl_Left> delLeftDatas = dx.tbl_lefts.Where(x => keys.Contains(x.id)).ToList();
                        dx.tbl_lefts.RemoveRange(delLeftDatas);
                        List<tbl_Right> intoRightDatas = dx.tbl_rights.Where(x => keys.Contains(x.id)).ToList();
                        if(intoRightDatas != null && intoRightDatas.Count >0) dx.tbl_rights.RemoveRange(intoRightDatas);
                        dx.SaveChanges();

                        foreach (JObject data in newdatas)
                        {
                            tbl_Right _obj = new tbl_Right();
                            _obj.id = data["id"] == null ? "" : data["id"].ToString();
                            _obj.name = data["name"] == null ? "" : data["name"].ToString();
                            dx.tbl_rights.Add(_obj);
                        }
                        dx.SaveChanges();
                    }
                    else
                    {
                        List<string> keys = newdatas.Select(x => x["id"].ToString()).ToList();
                        List<tbl_Right> delRightDatas = dx.tbl_rights.Where(x => keys.Contains(x.id)).ToList();
                        dx.tbl_rights.RemoveRange(delRightDatas);
                        List<tbl_Left> intoLeftDatas = dx.tbl_lefts.Where(x => keys.Contains(x.id)).ToList();
                        if (intoLeftDatas != null && intoLeftDatas.Count > 0) dx.tbl_lefts.RemoveRange(intoLeftDatas);
                        dx.SaveChanges();

                        foreach (JObject data in newdatas)
                        {
                            tbl_Left _obj = new tbl_Left();
                            _obj.id = data["id"] == null ? "" : data["id"].ToString();
                            _obj.name = data["name"] == null ? "" : data["name"].ToString();

                            dx.tbl_lefts.Add(_obj);
                        }
                        dx.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                result["code"] = 1;
                result["msg"] = ex.Message;
            }
            return result.ToString();
        }

        /// <summary>
        /// 邮件内容生成处理
        /// </summary>
        /// <returns></returns>
        [HttpPost("[action]")]
        public string GenerateMailClick()
        {
            JObject result = new jsonTool().InitJson();
            try
            {
                JArray _arr = new JArray();
                List<string> _result = new List<string>();
                using (ReposContext dx = new ReposContext())
                {
                    _result =  dx.tbl_rights.Select(x=>x.id).ToList();
                }
                if (_result == null || _result.Count == 0)
                {
                    result["code"] = 1;
                    result["msg"] = "nodata";
                    return result.ToString();
                }
                result["data"] = string.Join(',', _result); 
            }
            catch (Exception ex)
            {
                result["code"] = 1;
                result["msg"] = ex.Message;
            }
            return result.ToString();
        }
    }
}
