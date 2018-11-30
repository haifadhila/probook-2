create table if not exists Books (
  idBook varchar(50),
  price double,
  category varchar(100),
  primary key (idBook)
) engine=InnoDB default charset=utf8mb4;

create table if not exists Transactions (
  idTransaction int not null auto_increment,
  idBook varchar(50) not null,
  idUser int not null,
  orderDate date not null,
  quantity int not null,
  primary key (idTransaction),
  foreign key (idBook)
    references Books(idBook)
    on delete cascade on update cascade
) engine=InnoDB default charset=utf8mb4;
