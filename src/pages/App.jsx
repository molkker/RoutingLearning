import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {


  useEffect(() => {
    // fetchでurlにデータをrequest 
    fetch("http://localhost:5000/ktknwords").then(
      response => response.json() //
    ).then(
      // json化したデータをbackEndDataにセットする
      data => {
        setKtknWords(data.ktknWords)
      }
    )
  },[])

  const [ktknWords,setKtknWords] = useState([])
  const [word, setWord] = useState("カタカナは禁止！")
  const [btnWord, setbtnWord] = useState("スタート")
  const [counts, setCounts] = useState([0, 0, 0]);
  const [playerNames, setPlayerNames] = useState(["","",""]);
  
  const handlePlus = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
    if (newCounts[index] === 10) {
      setTimeout(() => alert(`ゲーム終了!! ${playerNames[index]}の勝ち!!`), 100)
    }
  };

  const handleMinus = (index) => {
    const newCounts = [...counts];
    newCounts[index] -= 1;
    setCounts(newCounts);
    if (newCounts[index] < 0) {
      newCounts[index] += 1
      setCounts(newCounts);
    }
  };

  const playerAdd  = () => {
    if (counts.length < 10) {
      setCounts([...counts, 0])
      setPlayerNames([...playerNames, ""])
    } 
  }

  const onChangeName = (e, index) => {
    playerNames[index] = e.target.value;
  }

  const pleyerDelete = (index) => {
    const newCounts = [...counts];
    newCounts.splice(index, 1);
    setCounts(newCounts);

    const newPlayerNames = [...playerNames];
    newPlayerNames.splice(index, 1);
    setPlayerNames(newPlayerNames)
   }

  const changeWord = () => {
    const ktknWord = ktknWords[Math.floor(Math.random() * ktknWords.length)] 
    const NewKtknWords = ktknWords.filter(( word ) => {
      return word !== ktknWord;
    });
    if (NewKtknWords.length === 0) {
      setKtknWords(["カタカナはもうないよ！"])
    } else {
      setKtknWords(NewKtknWords);
    }
    setWord(ktknWord);
    useEffect(setbtnWord("ワード変更"),[])
  }


  return (
    <>
      <div className='head'>
        <h2>カタカナーシ</h2>
        <p>カタカナを使わずにカタカナの言葉を説明しよう!!</p>
        <p>答えを当てた人・当ててもらった人・カタカナ使ったことを指摘した人　は１点ゲット!!</p>
      </div>
      <div className="card">
        <h1>{word}</h1>
      </div>
      <button className='cgWord' onClick={changeWord}>{btnWord}</button>

      <div className='players'>
        {counts.map((count, index) => (
          <div key={index}>
            <div className='player'>
              <input placeholder='プレイヤー名を入力' type="text" onChange={(e) => onChangeName(e,index)} />
              <p>{count}点</p>
              <button onClick={() => handlePlus(index)}>十</button>
              <button onClick={() => handleMinus(index)}>一</button>
            </div>
            <button className='btnDelete' onClick={() => pleyerDelete(index)}>削除</button>
          </div>
        ))}
      </div>
      <div>
        <button className='btnAdd' onClick={playerAdd}>プレイヤー追加</button>
      </div>
    </>
  )
}

export default App
