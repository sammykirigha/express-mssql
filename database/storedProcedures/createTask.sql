--create task procedure

CREATE OR ALTER PROCEDURE [dbo].[uspInsertInToTasks]
    @id VARCHAR(100),
    @task_name VARCHAR(50),
    @start_date DATE,
    @description VARCHAR(250),
    @duration VARCHAR(50),
    @status VARCHAR(50),
    @project_id VARCHAR(50),
    @user_id VARCHAR(50)

AS
BEGIN
    SET NOCOUNT ON
    INSERT INTO [dbo].tasks
        (
        id
        ,task_name
        ,start_date
        ,description
        ,duration
        ,status
        ,project_id
        ,user_id
        )
    VALUES
        (
            @id,
            @task_name,
            @start_date,
            @description,
            @duration,
            @status,
            @project_id,
            @user_id
    )

END
GO