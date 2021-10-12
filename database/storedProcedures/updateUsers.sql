--a stored procedure to update the users table
ALTER PROCEDURE uspUpdateInToUsers
    @id INT,
    @username VARCHAR(50),
    @full_name VARCHAR(50),
    @age INT,
    @role VARCHAR(50),
    @gender VARCHAR(50),
    @email VARCHAR(100)
    ​
BEGIN​
    SET NOCOUNT ON
    UPDATE dbo.users SET 
            username = @username
            ,full_name = @full_name
            ,age= @age
            ,role = @role
            ,gender = @gender
           ,email = @email
      WHERE id = @id
    SELECT @@ROWCOUNT
END;
GO