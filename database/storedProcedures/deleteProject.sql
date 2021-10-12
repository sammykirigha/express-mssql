--`UPDATE ${this.tableName} SET isDeleted = 1 WHERE id = ${id} `

CREATE PROCEDURE [dbo].[deleteProject]
    @id INT
AS
SET NOCOUNT ON;
BEGIN
    UPDATE dbo.projects SET 
            isDeleted = 1
      WHERE id = @id
END 