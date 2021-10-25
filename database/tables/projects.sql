DROP TABLE dbo.projects;

--create project table
CREATE TABLE [dbo].projects
(
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    project_name VARCHAR(50) NOT NULL UNIQUE,
    start_date DATE,
    duration VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL,
    initial_activity VARCHAR(100) NOT NULL,
    isDeleted INT DEFAULT(0),
    team_lead_id VARCHAR(50) FOREIGN KEY REFERENCES [dbo].users(id) ON DELETE CASCADE ON UPDATE CASCADE,
);
GO

select *
from projects