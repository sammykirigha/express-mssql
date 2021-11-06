drop table project_assign_queue
create table [dbo].project_assign_queue
(
    id int IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    user_id VARCHAR(50) not null ,
    isSent int DEFAULT(0)
)

select *
from [dbo].project_assign_queue

delete from [dbo].project_assign_queue where user_id = '567b4363-85f4-4987-9156-58e2104b1535' 