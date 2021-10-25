ALTER PROCEDURE [dbo].[getProjects]
(
    @project_id VARCHAR(50) = NULL,
    @user_id VARCHAR(50),
    @PageNumber INT = 0,
    @NumberOfRecordsPerPage INT = 100
)
AS
BEGIN
SET NOCOUNT ON;
    DECLARE @isAdmin BIT;

    SELECT @isAdmin = isAdmin FROM [dbo].users WHERE id = @user_id AND isDeleted =  0;
    
    IF @project_id IS NOT NULL
    BEGIN 
        SELECT * FROM [dbo].projects WHERE id = @project_id AND isDeleted = 0
        FOR JSON PATH, INCLUDE_NULL_VALUES
    END
    ELSE
    BEGIN 
       IF @isAdmin = 1
       BEGIN
            SELECT * FROM [dbo].projects p WHERE isDeleted = 0 ORDER by p.id
            OFFSET (@PageNumber * @NumberOfRecordsPerPage) ROWS
            FETCH NEXT @NumberOfRecordsPerPage ROWS ONLY
            FOR JSON PATH, INCLUDE_NULL_VALUES
        END
        ELSE
        BEGIN        
            SELECT 
            DISTINCT p.id,
                p.project_name,
                p.start_date,
                p.duration,
                p.description,
                p.team_lead_id,
                p.initial_activity
            FROM [projects] p
            WHERE isDeleted = 0
            ORDER BY p.id
            OFFSET (@PageNumber * @NumberOfRecordsPerPage) ROWS
            FETCH NEXT @NumberOfRecordsPerPage ROWS ONLY
            FOR JSON PATH, INCLUDE_NULL_VALUES
       END 
    END
END