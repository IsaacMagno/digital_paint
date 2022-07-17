import React, { useState } from "react";
import RenderInks from "./components/RenderInks";
import areaValidate from "./middlewares/areaValidate";
import paintCalculator from "./functions/paintCalculator";

const App = () => {
  const [valid, setValid] = useState(true);
  const [ink, setInks] = useState([]);
  const [inputFields, setInputFields] = useState([
    { width: "", height: "", window: "", door: "" },
  ]);
  const [finish, setFinish] = useState(false);

  const addFields = () => {
    let newfield = { width: "", height: "", window: "", door: "" };

    setInputFields([...inputFields, newfield]);
  };

  const handleFormChange = (index, { target }) => {
    const { name, value } = target;

    let data = [...inputFields];
    data[index][name] = value;

    setValid(areaValidate(data[index]));

    setInputFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    if (inputFields.length < 4) {
      addFields();
    }
    if (inputFields.length === 4) {
      const inks = paintCalculator(inputFields);
      setInks(inks);
      setFinish(true);
    }

    setValid(true);
  };

  return (
    <div className='container-flex'>
      <div className='container'>
        <h1>Digital Paint</h1>

        {finish ? (
          <RenderInks inks={ink} area={inputFields} />
        ) : (
          <form onSubmit={submit}>
            <p className='p-lower' data-testid='p-info'>
              Digite abaixo o comprimento, altura e número de portas e janelas
              que tem cada parede
            </p>
            {inputFields.map((input, index) => {
              return (
                <div key={index} role='application'>
                  <input
                    id='width'
                    name='width'
                    placeholder='Comprimento'
                    value={input.width}
                    type='number'
                    data-testid={`width-input-${index}`}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <input
                    id='height'
                    name='height'
                    placeholder='Altura'
                    value={input.height}
                    type='number'
                    data-testid={`height-input-${index}`}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <input
                    id='window'
                    name='window'
                    placeholder='Número de Janelas'
                    value={input.window}
                    type='number'
                    data-testid={`window-input-${index}`}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                  <input
                    id='door'
                    name='door'
                    placeholder='Número de Portas'
                    value={input.door}
                    type='number'
                    data-testid={`door-input-${index}`}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </div>
              );
            })}
            <button
              onClick={submit}
              data-testid='send-button'
              disabled={valid}
              type='button'
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
