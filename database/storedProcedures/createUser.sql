
--a stored procedure to insert into users table
ALTER PROCEDURE uspInsertInToUsers
    @username VARCHAR(50),
    @full_name VARCHAR(50),
    @age INT,
    @role VARCHAR(50),
    @gender VARCHAR(50),
    @project_id INT,
    @password CHAR(100),
    @email VARCHAR(100)
AS​
BEGIN​
    SET NOCOUNT ON
    INSERT INTO dbo.users
        (
        [username]
        ,full_name
        ,age
        ,role
        ,gender
        ,project_id
        ,[password]
        ,[email]
        )
    VALUES
        (
            @username,
            @full_name,
            @age,
            @role,
            @gender,
            @project_id,
            @password,
            @email
    )

END;
GO