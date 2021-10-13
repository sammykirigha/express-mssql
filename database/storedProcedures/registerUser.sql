CREATE OR ALTER PROCEDURE [dbo].[userRegister]
    @id VARCHAR(50),
    @username VARCHAR(50),
    @full_name VARCHAR(50),
    @email VARCHAR(50),
    @gender VARCHAR(50),
    @age INT,
    @password CHAR(100),
    @isAdmin INT

AS
SET NOCOUNT ON;

BEGIN
    INSERT INTO dbo.users
        (id, username, full_name, email, gender, age, password, isAdmin)
    VALUES
        (@id, @username, @full_name, @email, @gender, @age, @password, @isAdmin)
END