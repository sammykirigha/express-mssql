CREATE PROCEDURE [dbo].[deleteTask]
    @id INT
AS
SET NOCOUNT ON;
BEGIN
    UPDATE dbo.tasks SET
         isDeleted = 1
    WHERE id = @id
END