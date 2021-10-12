--select all info procedure
ALTER PROCEDURE [dbo].[uspSelectTask]
    @id INT,
    @task_name VARCHAR(50),
    @description VARCHAR(250),
    @duration VARCHAR(50),
    @project_id INT,
    @user_id INT
AS 
BEGIN
    SET NOCOUNT ON
    SELECT t.id, t.task_name, t.duration as task_Duration, t.description as task_Description, t.project_id, p.project_name, s.username
    FROM dbo.tasks t
        INNER JOIN dbo.projects p ON t.project_id = p.id
        INNER JOIN dbo.users s ON s.id = t.user_id
END
GO