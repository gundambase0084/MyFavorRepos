USE [master]
GO
/****** Object:  Database [MyFavorRepos]    Script Date: 2021/3/22 17:57:32 ******/
CREATE DATABASE [MyFavorRepos]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MyFavorRepos', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\MyFavorRepos.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MyFavorRepos_log', FILENAME = N'D:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\MyFavorRepos_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [MyFavorRepos] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MyFavorRepos].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MyFavorRepos] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MyFavorRepos] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MyFavorRepos] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MyFavorRepos] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MyFavorRepos] SET ARITHABORT OFF 
GO
ALTER DATABASE [MyFavorRepos] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MyFavorRepos] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MyFavorRepos] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MyFavorRepos] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MyFavorRepos] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MyFavorRepos] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MyFavorRepos] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MyFavorRepos] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MyFavorRepos] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MyFavorRepos] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MyFavorRepos] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MyFavorRepos] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MyFavorRepos] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MyFavorRepos] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MyFavorRepos] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MyFavorRepos] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MyFavorRepos] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MyFavorRepos] SET RECOVERY FULL 
GO
ALTER DATABASE [MyFavorRepos] SET  MULTI_USER 
GO
ALTER DATABASE [MyFavorRepos] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MyFavorRepos] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MyFavorRepos] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MyFavorRepos] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MyFavorRepos] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MyFavorRepos] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'MyFavorRepos', N'ON'
GO
ALTER DATABASE [MyFavorRepos] SET QUERY_STORE = OFF
GO
USE [MyFavorRepos]
GO
/****** Object:  User [test]    Script Date: 2021/3/22 17:57:33 ******/
CREATE USER [test] FOR LOGIN [test] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [test]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [test]
GO
ALTER ROLE [db_ddladmin] ADD MEMBER [test]
GO
ALTER ROLE [db_denydatareader] ADD MEMBER [test]
GO
ALTER ROLE [db_denydatawriter] ADD MEMBER [test]
GO
/****** Object:  Table [dbo].[tbl_Left]    Script Date: 2021/3/22 17:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Left](
	[id] [varchar](50) NOT NULL,
	[name] [varchar](50) NULL,
 CONSTRAINT [PK_v] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Right]    Script Date: 2021/3/22 17:57:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Right](
	[id] [varchar](50) NOT NULL,
	[name] [varchar](50) NULL,
 CONSTRAINT [PK_tbl_Right] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [MyFavorRepos] SET  READ_WRITE 
GO