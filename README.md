##### 20210322更新事项：
##### 1.更新.net Core sdk到5.0；
##### 2.更新controller名称，并生成业务要求的三个事件；
##### 3.实现了从githu取得数据的功能，不足之处是没有找到正确的检索api，怀疑是在issue或者是label检索api中实现的，暂时没有实验出来，因此先以从后台取得的key（id）与全部数据（直接从github取得）进行了匹配实现该功能；
##### 4.后台也已经用sqlserverEf实现。
##### 5.关于代码：
      - 代码目录为MyFavorRepos
      - Sql为sql文，包括了整库sql和只含表的sql，使用时直接打开管理客户端执行其中内容即可，我使用的是工具是Microsoft SQL Server Management Studio 18，数据库是sql server2019。（可能需要修改相应的dbf物理文件地址）
