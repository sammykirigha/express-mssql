DROP TABLE dbo.projects;

--create project table
CREATE TABLE [dbo].projects
(
    id INT IDENTITY(1, 1) PRIMARY KEY,
    project_name VARCHAR(50) NOT NULL UNIQUE,
    start_date DATE,
    duration VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    team_lead VARCHAR(50) NOT NULL,
    initial_activity VARCHAR(100) NOT NULL,
    isDeleted INT DEFAULT(0)
);
GO