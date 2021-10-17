CREATE OR ALTER PROCEDURE [dbo].[deleteUsers]
    @id VARCHAR(50)
AS
BEGIN
    UPDATE [dbo].[users] SET isDeleted = 1 WHERE id = @id
END      