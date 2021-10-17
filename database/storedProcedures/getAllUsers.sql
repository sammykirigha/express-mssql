CREATE OR ALTER PROCEDURE [dbo].[getAllUsers]
AS
BEGIN
    SELECT u.id,
        u.username,
        u.full_name,
        u.email,
        u.gender,
        u.age,
        u.isAdmin
    FROM [dbo].users u
    WHERE isDeleted = 0
    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES
    END          
