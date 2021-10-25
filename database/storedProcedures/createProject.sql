ALTER PROCEDURE [dbo].[uspInsertInToProjects]
    @id VARCHAR(50),
    @project_name VARCHAR(50),
    @start_date DATE,
    @duration VARCHAR(50),
    @description VARCHAR(250),
    @team_lead_id VARCHAR(50),
    @initial_activity VARCHAR(100)

AS
BEGIN
    SET NOCOUNT ON
    INSERT INTO [dbo].projects
        (
        id,
        project_name,
        start_date,
        duration,
        description,
        team_lead_id,
        initial_activity
        )
    VALUES
        (
            @id,
            @project_name,
            @start_date,
            @duration,
            @description,
            @team_lead_id,
            @initial_activity
    )

END