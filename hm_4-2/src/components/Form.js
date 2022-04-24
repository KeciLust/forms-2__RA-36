import React, {useState} from 'react';
import {nanoid} from 'nanoid';



function Form() {
    const [data, setData] = useState({
        date: '',
        distance: ''
    })
    const [row, setRow] = useState([{
        date: '',
        distance: ''
    }])
  const onSubmitHandle = e => {
      e.preventDefault()
     setRow(prevRow => [...prevRow, data])
     setData({  date: '',
                distance: '',
                id: nanoid()
            })
      
  }  
  const onChangeDateHandle = e => {
      e.preventDefault()

     const name = e.target.name ;
     const value = e.target.value;
      setData(prevData => ({...prevData, [name]: value}));
  }
  const onClickTableRemove = id => {
      setRow( prevRow => prevRow.filter(o => o.id!==id));
  }

  return (
  <>
    <form className='formForm' onSubmit={onSubmitHandle}>
        <input className='formInputDate formStyle' name="date" value={data.date} onChange={onChangeDateHandle} type='date' required />
        <input className='formInputDistance formStyle' name="distance" value={data.distance} onChange={onChangeDateHandle} type='number' required placeholder='Пройденый путь' />
        <button className='formButton formStyle' type='submit'>ОК</button>
    </form>
    <table className='tableTable' >
      
           <tr>
           <td className='tableTd'>Дата</td>
            <td className='tableTd'>Дистанция</td>
            <td className='tableTd'>Действие</td> 
           </tr>
       
            {row.sort((a, b) => {
                if(a.date > b.date){return 1}
                if(a.date < b.date){return -1}
                a.distance =Number(a.distance) + Number(b.distance);
                b.date = '';
                b.distance = '';
                return 0;
            })
                .map(o => o.date? (<tr key={o.id} ><td className='tableTd'>{o.date}</td>
                           <td className='tableTd'>{o.distance}</td>
                           <td className='tableButtonRemove' onClick={() => onClickTableRemove(o.id)}>✘</td>
                           </tr>):null
            )}
        
    </table>
  </>     
  )
}



export default Form
