# Trello-todo (with React-beautiful-dnd)
 <img width="1208" alt="스크린샷 2023-03-20 14 12 47" src="https://user-images.githubusercontent.com/105909665/226252323-544fdb66-c021-42e5-b9b1-355f93ebd963.png">

## 프로젝트 소개

- 기존의 text와 버튼만으로 작동하는 투두리스트가 아닌 좀 더 다이내믹한 UI를 가진 앱을 만들어보고 싶었습니다.
- 그러던 중 Beautiful D&D 라이브러리를 알게 되었고 기초적인 사용법을 습득 후 카테고리 보드 간 이동 등을 심화 적용 시켜봤습니다.


### 🗓 수행 기간

> 2023.02.25 - 2022.03.01

### 📢 배포 링크

> https://bigwave-cho.github.io/trello-todo/

### 실행방법
- npm i
- npm start

목차
- [기술 스택](#기술-스택)
- [구현 기능](#구현-기능)
- [총평](#총평)

<br>

## 기술 스택
<div>
 <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> 
 <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
 </div>
 </br>
 
 > STYLE
 <div>


 <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
 </div>
</br> 
 > Library 
</br> 
 <a href="https://www.npmjs.com/package/react-beautiful-dnd">React Beautiful dnd</a>



<br>

## 구현 기능
![trello](https://user-images.githubusercontent.com/105909665/226241700-cc93f3dd-84ba-4571-93c7-dc8de2adb59c.gif)

- state는 전역상태관리 Recoil을 이용하여 관리하였습니다.
- 또한 state를 Local Storage에 저장하여 브라우저를 종료했다 돌아온 후에도 리스트를 유지 가능합니다.
- 투두 리스트 순서, 카테고리 간 이동, 카테고리 보드 순서 이동 등이 가능하도록 구현하였습니다.



<br>

## 총평

- 리코일, 리덕스 등의 핵심 라이브러리 외에 이렇게 Drag & Drop 이라는 특정 기능을 위한 라이브러리를 처음 사용해보았습니다.
- 라이브러리라고 마냥 적용이 쉬울 줄 알았는데 제대로 사용하려면 학습이 필요함을 절실히 느꼈습니다.

<br>



