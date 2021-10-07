ALTER PROCEDURE [dbo].[getProjects]

AS
SET NOCOUNT ON;

BEGIN
    SELECT p.id,
        p.project_name,
        p.start_date,
        p.duration,
        p.description,
        p.team_lead,
        p.initial_activity
    FROM [projects] p
    WHERE isDeleted = 0
END 