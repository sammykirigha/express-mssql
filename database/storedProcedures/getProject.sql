ALTER PROCEDURE [dbo].[getProject]
    @id VARCHAR(50)
AS

SET NOCOUNT ON;

BEGIN
    SELECT p.id,
        p.project_name,
        p.start_date,
        p.duration,
        p.description,
        p.team_lead_id,
        p.initial_activity
    FROM [projects] p
    WHERE id = @id AND isDeleted = 0
END  

