/* eslint-disable */
import './App.css';
import { useState } from 'react';

function App() {
  let [ title, setTitle ] = useState(['코디 컬러조합','데일리 코디','트렌드 아이템']);
  let [ likeCnt, setLikeCnt ] = useState([0,1,5,11,15]);
  let [ modalOpen, setModalOpen ] = useState(false); //modal visible 상태 부여
  let [ clickIndex, setIndex ] = useState(0);
  let [ inputState, setInput ] = useState('');
  /** 
   *  << Destructuring 문법 >>
   *  ['stateName', function()] = useState('임시로 저장할 값 ') 
   *  fx()는 생략해도 무관함.
  */

 function sortTitle(){
   let copyTitle = [...title];
   setTitle(copyTitle.sort());
  }

  function clickLike(i) {
    likeCnt[i] += 1;
    let copyLike = [...likeCnt];

    setLikeCnt(copyLike)
  }

  function pushInput(){
    let copyTitle = [...title]
    copyTitle.unshift(inputState);
    setTitle(copyTitle)
  }

  function deleteTitle(i){
    let copyTitle = [...title];
    let copyLike = [...likeCnt];
    copyTitle.splice(i,1);
    setTitle(copyTitle);
    
    copyLike.splice(i,1);
    setLikeCnt(copyLike)
  }
  
  return (
    <div className="App">
      <div className="black-nav">
        <h4>My Blog</h4>
      </div>
      <h4 style={{fontSize:'20px'}}> Posts </h4>
      
      <button onClick={sortTitle}>가나다정렬</button>

      {
        title.map(function(t,i) {
          return (
            <div className='list' key={i}>
              <h4 onClick={ ()=> { 
                setModalOpen(modalOpen ? false : true);  
                setIndex(i);
                } 
               }
              > 
                { t }
                <span className='likeBtn' onClick={ (e)=>{ e.stopPropagation(); clickLike(i); }}>👍</span> {likeCnt[i]} 
              </h4>
              <p>발행일 : 7월 25일</p>
              <button onClick={ ()=>{ deleteTitle(i) }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e)=>{setInput(e.target.value)}}/>
      <button onClick={ pushInput } >작성</button>

      { modalOpen === true ? <Modal pTitle = {title} i={clickIndex} color="lightyellow" /> : null }      
    </div>
  );
} /** APP */

/** Component */
function Modal(props){
  return (
    <div className="modal" style={{background : props.color }}>
      <h4>{props.pTitle[props.i]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      {/* <button onClick={ ()=> { setTitle('코디 색조합 비추') }}>글수정</button> */}
    </div>
  )
}

export default App;
