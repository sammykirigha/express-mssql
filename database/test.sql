USE Express
exec dbo.getProjects
select [Name]
from sysobjects
where type = 'p' and category=0
select name, database_id
from sys.databases ;