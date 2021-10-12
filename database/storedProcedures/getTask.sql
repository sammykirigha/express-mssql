CREATE PROCEDURE [dbo].[getTask]
    @id INT
AS
SET NOCOUNT ON;
BEGIN
    SELECT t.id,
        t.task_name,
        t.description,
        t.duration,
        t.project_id,
        t.user_id
    FROM [tasks] t
    WHERE id = @id AND isDeleted = 0
END 