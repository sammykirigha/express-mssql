ALTER PROCEDURE [dbo].[getTasks]
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
    WHERE isDeleted = 0
END 