const ALERTS = {
  invalid_area: () => {
    alert("Área precisa ser maior que 1m² e menor que 50²!");
  },
  invalid_door: () => {
    alert(
      "A altura da parede precisa ser 30cm maior que a altura da porta! (1.90m)"
    );
  },
  invalid_windoor: () => {
    alert(
      "Área das janelas e portas não pode ser maior que 50% da área da parede!"
    );
  },
};

export default ALERTS;
