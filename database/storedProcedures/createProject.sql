ALTER PROCEDURE [dbo].[uspInsertInToProjects]
    @project_name VARCHAR(50),
    @start_date DATE,
    @duration VARCHAR(50),
    @description VARCHAR(250),
    @team_lead VARCHAR(50),
    @initial_activity VARCHAR(100)

AS
BEGIN
    SET NOCOUNT ON
    INSERT INTO dbo.projects
        (
        [project_name]
        ,[start_date]
        ,[duration]
        ,[description]
        ,[team_lead]
        ,[initial_activity]
        )
    VALUES
        (
            @project_name,
            @start_date,
            @duration,
            @description,
            @team_lead,
            @initial_activity
    )

END