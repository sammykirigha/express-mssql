--select all info procedure
CREATE OR ALTER PROCEDURE [dbo].[uspSelectTask]
    @id VARCHAR(100),
    @task_name VARCHAR(50),
    @start_date DATE,
    @status VARCHAR(50),
    @description VARCHAR(250),
    @duration VARCHAR(50),
    @project_id VARCHAR(50),
    @user_id VARCHAR(50)
AS 
BEGIN
    SET NOCOUNT ON
    SELECT t.id, t.task_name, t.duration as task_Duration, t.start_date, t.status, t.description as task_Description, t.project_id, p.project_name, s.username
    FROM dbo.tasks t
        INNER JOIN dbo.projects p ON t.project_id = p.id
        INNER JOIN dbo.users s ON s.id = t.user_id
        FOR JSON PATH, INCLUDE_NULL_VALUES
END
GO

-- SELECT t.id, t.task_name, t.duration as task_Duration, t.start_date, t.status, t.description as task_Description, t.project_id, p.project_name, s.username
-- FROM dbo.tasks t
--     INNER JOIN dbo.projects p ON t.project_id = p.id
--     INNER JOIN dbo.users s ON s.id = t.user_id
-- FOR JSON PATH, INCLUDE_NULL_VALUES