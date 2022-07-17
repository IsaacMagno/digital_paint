import React from "react";
import areaCalculator from "../functions/areaCalculator";
import AUX from "../functions/reload";

const RenderInks = ({ inks, area }) => {
  const total = parseFloat(areaCalculator(area)).toFixed(2);
  return (
    <div>
      <p data-testid='result-p'>Para pintar {total} m² você vai precisar de:</p>
      {inks.map((ink, i) => {
        return (
          <p key={i} data-testid={`result-ink-${i}`}>
            {ink.quantity} Lata(s) de {ink.name} L de tinta
          </p>
        );
      })}
      <button
        type='button'
        data-testid='button-back'
        onClick={() => AUX.reload()}
      >
        Voltar
      </button>
    </div>
  );
};

export default RenderInks;
