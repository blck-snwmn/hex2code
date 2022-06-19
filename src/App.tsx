import { useReducer, useState } from 'react'

type Action = { language: 'Go', input: string, word: number }

const mapper = {
}

const reducer = (_: string, action: Action) => {
  const input = action.input
  const split = input.split(' ')
  const filltered = split.filter(i => i.length == 2)
  const mapped = filltered.map(i => '0x' + i + ',') // to hex format

  const format = mapped.reduce((acc, x) => { // fix the length of one line
    const last = acc.length - 1
    acc[last].push(x)
    if (acc[last].length == action.word) {
      acc.push([]) // new line
    }
    return acc
  }, [[]] as [string[]])
  const joined = format.map(i => i.join(' ')).join('\n')
  return joined
}

function App() {
  const [value, setValue] = useState("")
  const [wordNum, setWordNum] = useState("")
  const [state, dispatch] = useReducer(reducer, "")


  return (
    <>
      <div>
        <textarea rows={20} cols={200} onChange={(e) => { setValue(e.target.value) }} ></textarea>
      </div>
      <div>
        <label htmlFor="wordPerLint">1行の文字数</label>
        <input name='wordPerLint' onChange={(e) => { setWordNum(e.target.value) }} />
      </div>
      <button onClick={() => {
        const w = Number(wordNum)
        dispatch({ language: "Go", input: value, word: w ? w : 8 })
      }}>Change</button>
      <div>
        <textarea rows={20} cols={200} value={state}></textarea>
      </div>
    </>
  )
}

export default App
