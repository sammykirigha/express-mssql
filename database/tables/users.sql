--create users table
CREATE TABLE [dbo].users
(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    full_name VARCHAR(50),
    age INT,
    [role] VARCHAR(50),
    gender VARCHAR(50),
    [password] CHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    project_id INT FOREIGN KEY REFERENCES [dbo].projects(id),
    isDeleted INT DEFAULT(0)
);
GO

SELECT *
FROM [dbo].users
GO


