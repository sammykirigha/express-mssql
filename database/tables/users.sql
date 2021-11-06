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

ALTER TABLE [dbo].users ADD project_assigned VARCHAR(50) DEFAULT
('unassigned')

ALTER TABLE [dbo].users DROP COLUMN project_assigned

SELECT *
FROM [dbo].users

delete FROM [dbo].users WHERE id = '09c52b25-80b1-4996-a444-3bc2d45fc56c'