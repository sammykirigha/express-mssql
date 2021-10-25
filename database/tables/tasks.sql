CREATE TABLE [dbo].tasks
(
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    task_name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    [description] VARCHAR(250),
    duration VARCHAR(100),
    status VARCHAR(50),
    project_id VARCHAR(50) FOREIGN KEY REFERENCES [dbo].projects(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(50) FOREIGN KEY REFERENCES [dbo].users(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    isDeleted INT DEFAULT(0)
);
GO

DROP TABLE [dbo].tasks