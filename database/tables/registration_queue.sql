drop table registration_queue
create table [dbo].registration_queue
(
    id int IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    user_id VARCHAR(50) not null ,
    isSent int DEFAULT(0)
)

select *
from [dbo].registration_queue