--create users table
DROP TABLE [dbo].users
CREATE TABLE [dbo].users
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    username VARCHAR(50) NOT NULL,
    full_name VARCHAR(50),
    age INT NOT NULL,
    isAdmin INT DEFAULT(0) ,
    gender VARCHAR(50),
    [password] CHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    isDeleted INT DEFAULT(0)
);
GO

SELECT *
FROM [dbo].users
GO


DELETE FROM [dbo].users WHERE email = 'dkirigha18@gmail.com';