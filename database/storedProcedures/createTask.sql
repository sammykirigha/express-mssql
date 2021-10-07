--create task procedure

CREATE PROCEDURE uspInsertInToTasks
    @task_name VARCHAR(50),
    @description VARCHAR(250),
    @duration VARCHAR(50),
    @project_id INT,
    @user_id INT

AS
BEGIN
    SET NOCOUNT ON
    INSERT INTO [dbo].tasks
        (
        [task_name]
        ,[description]
        ,[duration]
        ,[project_id]
        ,[user_id]
        )
    VALUES
        (
            @task_name,
            @description,
            @duration,
            @project_id,
            @user_id
    )

END
GO