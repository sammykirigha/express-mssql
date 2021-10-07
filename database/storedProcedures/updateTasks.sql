--update tasks stored procedure
CREATE PROCEDURE uspUpdateInToTasks
    @id INT,
    @task_name VARCHAR(50),
    @description VARCHAR(250),
    @duration VARCHAR(50),
    @project_id INT,
    @user_id INT
AS
BEGIN 
    SET NOCOUNT ON
    UPDATE dbo.tasks SET 
             task_name = @task_name
            ,description = @description
            ,duration= @duration
            ,project_id = @project_id
            ,user_id = @user_id
      WHERE id = @id
    SELECT @@ROWCOUNT
END;
GO