import "./Filter.css"

const Filter = ({setValueFilter}) => {

    function handleOnChange (ev) {

        console.log(ev.target.value)
        setValueFilter(ev.target.value);

    }


  return (
    <div className="div-input">

       <input className="style-input"
       placeholder="Encuentra la tarea buscando por título"
       onChange={handleOnChange}></input>
    
      
    </div>
  )
}

export default Filter
