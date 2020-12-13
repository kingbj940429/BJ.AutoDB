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

1) 데이터베이스에 접속하기 위한 기본셋팅을 입력해줍니다.

2) HOST, USER, PASSWORD, SCHEMA가 있습니다.

![BJ AutoTable_img_01](https://user-images.githubusercontent.com/63000843/98956981-05c91480-2544-11eb-9c82-8c4495f9c745.PNG)

1) json 데이터가 있는 URL을 입력해줍니다.

2) 생성할 테이블명 생성해줍니다.

3) 기준 키를 입력해줍니다.

![BJ AutoTable_img_02](https://user-images.githubusercontent.com/63000843/98956983-0661ab00-2544-11eb-8e1e-6696a57042f4.PNG)

* BJ.AutoTable로 생성할 json 데이터

![BJ AutoTable_img_04](https://user-images.githubusercontent.com/63000843/98957758-e7174d80-2544-11eb-9f7f-4cd4f7cfa4b8.PNG)

* BJ.AutoTable로 생성한 테이블

![BJ AutoTable_img_03](https://user-images.githubusercontent.com/63000843/98957761-e8487a80-2544-11eb-9417-661b244197fa.PNG)



