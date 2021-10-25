CREATE OR ALTER PROCEDURE [dbo].[getTask]
    @project_id VARCHAR(50),
    @task_id VARCHAR(100)
AS
SET NOCOUNT ON;
BEGIN
    SELECT t.id,
        t.task_name,
        t.description,
        t.duration,
        t.start_date,
        t.project_id,
        t.user_id
    FROM [tasks] t
    WHERE project_id = @project_id AND id = @task_id AND isDeleted = 0
    FOR JSON PATH, INCLUDE_NULL_VALUES
END 