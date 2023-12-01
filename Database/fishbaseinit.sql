create table player (
    ID int,
    name char(20),
    poleName char(20),
    poleCond float,
    poleStrAmount int,
    bait char(20),
    stringName char(20),
    stringBreakPercent float,
    luck char(10),
    location char(20),
    constraint PK_Player primary key (ID, name)
);