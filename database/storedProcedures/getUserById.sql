CREATE OR ALTER PROCEDURE [dbo].[getAllUserById]
    @id VARCHAR(50)
AS
BEGIN
    SELECT u.id,
        u.username,
        u.full_name,
        u.email,
        u.gender,
        u.age,
        u.isAdmin
    FROM [dbo].[users] u
    WHERE id = @id
END          
