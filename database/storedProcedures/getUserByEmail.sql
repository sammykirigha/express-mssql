CREATE OR ALTER PROCEDURE [dbo].[getUserByEmail]
    @email VARCHAR(100)
AS
SET NOCOUNT ON;
BEGIN
    SELECT
        u.id,
        u.username,
        u.full_name,
        u.age,
        u.email,
        u.gender,
        u.isAdmin,
        u.password,
        u.isDeleted
    FROM [users] u
    WHERE email = @email
END
