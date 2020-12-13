[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fkingbj940429%2FBJ.AutoDB&count_bg=%233D7CC8&title_bg=%23555555&icon=json.svg&icon_color=%23CDBD2D&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# BJ.AutoDB

This is a web service that puts json-type data of Riot API into the database.

With BJ.AutoTable, you can:

1) Json data in url form can be easily made into a table.
2) MySQL query statements can be easily processed on the website with simple input.

![axios](https://img.shields.io/badge/axios-v0.21.0-brightgreen)
![mysql2](https://img.shields.io/badge/mysql2-v2.2.5-informational)
![expres](https://img.shields.io/badge/express-v4.16.1-green)

## Motivation

You can create a BJ.GG by adding a huge amount of data, or by writing query statements directly to the current logic, as shown below.
```js
For (var data in datas){
await dbPool('INSERT INTO VALUES');
}
```
BUT I thought it was too inefficient to create a table. So hand it to the website
I wanted to make it easy to put json URLs or query statements and create a table on its own.

## Example of use

1) Enter the default settings for accessing the database.

2) There are HOST, USER, PASSWORD, SCHEMA

![BJ AutoTable_img_01](https://user-images.githubusercontent.com/63000843/98956981-05c91480-2544-11eb-9c82-8c4495f9c745.PNG)

4) json Enter URL with data.

5) Generates the table name to generate.

6) Enter the reference key(Korean 참조키).

![BJ AutoTable_img_02](https://user-images.githubusercontent.com/63000843/98956983-0661ab00-2544-11eb-8e1e-6696a57042f4.PNG)

* json data(Riot API Data) to be generated with BJ.AutoTable

![BJ AutoTable_img_04](https://user-images.githubusercontent.com/63000843/98957758-e7174d80-2544-11eb-9f7f-4cd4f7cfa4b8.PNG)

* Table created with BJ.AutoTable

![BJ AutoTable_img_03](https://user-images.githubusercontent.com/63000843/98957761-e8487a80-2544-11eb-9417-661b244197fa.PNG)



