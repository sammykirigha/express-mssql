CREATE TABLE [dbo].tasks
(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    [description] VARCHAR(250),
    duration VARCHAR(100),
    project_id INT FOREIGN KEY REFERENCES [dbo].projects(id) ON DELETE CASCADE,
    user_id INT FOREIGN KEY REFERENCES [dbo].users(id) ON DELETE CASCADE,
    isDeleted INT DEFAULT(0)
);
GO

DROP TABLE [dbo].tasks