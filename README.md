# 설명
* 목적
```js
BJ.GG를 만들다가 엄청난 데이터 양을 일일이 넣거나 현재 로직에  아래 처럼 직접 쿼리문을 써서
for (var data in datas){
    await dbPool(`INSERT INTO VALUES`);
}
테이블을 생성하기엔 너무 비효율적이라고 생각했다. 따라서 웹사이트로 손
쉽게 json URL이나 쿼리문을 넣으면 알아서 테이블을 생성하도록 하고 싶었습니다.
```
* 장점
```
1) url의 형태의 json 데이터들을 손 쉽게 테이블로 만들수 있다.
2) 웹 사이트에 단순 입력로 손쉽게 MySQL 쿼리문을 처리할수 있다.
```
* 꼭 해야할것
```
1)비밀번호 암호화 시키기
2)int값 처리
3)주키 정할수 있게 하기
4)잘못된 url 주소 처리
```

# 실행화면
![BJ AutoTable_img_01](https://user-images.githubusercontent.com/63000843/98956981-05c91480-2544-11eb-9c82-8c4495f9c745.PNG)

1) 데이터베이스에 접속하기 위한 기본셋팅을 입력해줍니다.

2) HOST, USER, PASSWORD, SCHEMA가 있습니다.

![BJ AutoTable_img_02](https://user-images.githubusercontent.com/63000843/98956983-0661ab00-2544-11eb-8e1e-6696a57042f4.PNG)

1) json 데이터가 있는 URL을 입력해줍니다.

2) 생성할 테이블명 생성해줍니다.

3) 기준 키를 입력해줍니다.

![BJ AutoTable_img_03](https://user-images.githubusercontent.com/63000843/98957761-e8487a80-2544-11eb-9417-661b244197fa.PNG)

* BJ.AutoTable로 생성할 json 데이터

![BJ AutoTable_img_04](https://user-images.githubusercontent.com/63000843/98957758-e7174d80-2544-11eb-9f7f-4cd4f7cfa4b8.PNG)

* BJ.AutoTable로 생성한 테이블


# 작업 내역

### 2020-11-05
```
1) json 파일을 담고 있는 url 주소를 입력값을 넣어주면 그에 대한 테이블이 생성된다.(컬럼은 모든 컬럼이 생성된다.)
2) 입력값으로 테이블명과 컬럼명 추가하면 테이블 생성 가능
3) 기능에 대해선 좀더 고민을 해야할것 같다.
```

### 2020-11-06
```
1) url_json에서 컬럼 삭제 기능 추가
2) json에서 원하는 객체명만 테이블로 생성 가능
3) url_json에서 그냥 url주소, 테이블명만 넣으면 객체명을 컬럼명으로 테이블이 알아서 생성된다.
ex) 예시
"data":{"Aatrox":{"version":"10.22.1","id":"Aatrox","key":"266","name":"아트록스","title":"다르킨의 검".... 이라면
생성될 테이블의 컬럼명은 vesion_bj, id_bj ... 이런식으로 생성된다. bj는 개발자 이름이다. 
예약어도 피할수도 있고 개발자 이름을 남길수 있어서 일석이조다.
```
### 2020-11-07
```
1) 키 값에 따라 테이블을 생성할수 있다.
ex) 예시
{ 
    data : {
        name : 'name',
        id : 'id',
        info : {
            hp : 'hp',
            mp :' mp',
        }
    }
}
-이런 식이라고 가정했을 때 첫번째 INPUT에 data, 두번째 INPUT에 info를 집어 넣으면
info를 기준으로 hp, mp을 컬럼으로 가지는 테이블이 생성된다.
-첫번째 INPUT에만 data를 집어넣을 경우 data를 기준으로 name, id, info을 컬럼으로
가지는 테이블이 생성된다.
```
### 2020-11-08
```
1) 객체가 가지는 값이 배열일 경우 처리 가능
2) footer 컨텐츠가 추가되면 자동으로 하단으로 내려가게 수정
3) 각 INPUT에 있어서 값을 입력하지 않았거나 틀린 값을 입력했을 경우 예외 처리
4) 전체적인 css 업데이트
```
### 2020-11-09
```
1) 기준 키 값이 주키가 되도록 수정
```
