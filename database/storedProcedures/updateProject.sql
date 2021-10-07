ALTER PROCEDURE uspUpdateProjects
    @id INT,
    @project_name VARCHAR(50),
    @start_date DATE,
    @duration VARCHAR(50),
    @description VARCHAR(250),
    @team_lead VARCHAR(50),
    @initial_activity VARCHAR(100)

AS
BEGIN
    UPDATE dbo.projects SET 
            project_name = @project_name
           ,[start_date] = @start_date
           ,duration = @duration
           ,[description] = @description
           ,team_lead = @team_lead
           ,initial_activity = @initial_activity
    WHERE id = @id
    SELECT @@ROWCOUNT
END