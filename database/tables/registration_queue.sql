create table registration_queue
(
    id int IDENTITY NOT NULL PRIMARY KEY,
    user_id int not null ,
    isSent bit not null
)