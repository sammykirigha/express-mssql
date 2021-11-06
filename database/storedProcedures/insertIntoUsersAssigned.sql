CREATE OR ALTER PROCEDURE [dbo].[insertIntoUsersAssigned]
    @id VARCHAR(50),
    @user_id VARCHAR(50),
    @project_id VARCHAR(50)

AS
SET NOCOUNT ON

BEGIN
    INSERT INTO dbo.users_assigned
        (id, user_id, project_id)
    VALUES
        (@id, @user_id, @project_id)
END
GO;


CREATE OR ALTER PROCEDURE [dbo].[getAllUsersAssigned]
(
    @PageNumber INT= 0,
    @NumberOfRecordsPerPage INT = 100
)
AS
SET NOCOUNT ON

BEGIN 
    SELECT * FROM [dbo].users_assigned WHERE isDeleted = 0
    -- OFFSET (@PageNumber * @NumberOfRecordsPerPage) ROWS
    -- FETCH NEXT @NumberOfRecordsPerPage ROWS ONLY
    FOR JSON PATH, INCLUDE_NULL_VALUES
END
GO

EXEC getAllUsersAssigned