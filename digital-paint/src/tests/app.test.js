import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import RenderInks from "../components/RenderInks";
import ALERTS from "../middlewares/alerts";
import AUX from "../functions/reload";
import { ink, inputFields } from "./resultMock";

const numberFour = 4;
const invalid_area = jest.spyOn(ALERTS, "invalid_area");
const invalid_windoor = jest.spyOn(ALERTS, "invalid_windoor");
const invalid_door = jest.spyOn(ALERTS, "invalid_door");
const reload_func = jest.spyOn(AUX, "reload");

describe("Teste - Botões", () => {
  it("Verifica se existe botão de Enviar", () => {
    render(<App />);

    const buttonElement = screen.getByTestId("send-button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveProperty("type", "button");
  });

  it("Verifica se o botão é ativado quando altura e comprimento estão corretos", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");

    userEvent.type(widthInput, "5");
    userEvent.type(heightInput, "5");

    expect(sendButton).not.toBeDisabled();
  });

  it("Verifica se o botão é desativado quando altura e comprimento estão incorretos", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");

    userEvent.type(widthInput, "10");
    userEvent.type(heightInput, "10");

    expect(sendButton).toBeDisabled();
  });

  it("Verifica se o botão é ativado quando area é menor que 50%", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");
    const windowInput = screen.getByTestId("window-input-0");

    userEvent.type(widthInput, "3");
    userEvent.type(heightInput, "3");
    userEvent.type(windowInput, "1");

    expect(sendButton).not.toBeDisabled();
  });

  it("Verifica se o botão é desativado quando area é maior que 50%", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");
    const windowInput = screen.getByTestId("window-input-0");

    userEvent.type(widthInput, "3");
    userEvent.type(heightInput, "3");
    userEvent.type(windowInput, "3");

    expect(sendButton).toBeDisabled();
  });

  it("Verifica se o botão é ativado quando altura da parede é maior que 30cm em relação a porta", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");
    const doorInput = screen.getByTestId("door-input-0");

    userEvent.type(widthInput, "4");
    userEvent.type(heightInput, "4");
    userEvent.type(doorInput, "1");

    expect(sendButton).not.toBeDisabled();
  });

  it("Verifica se o botão é desativado quando altura da porta é menor que 30cm em relação a parede", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");
    const doorInput = screen.getByTestId("door-input-0");

    userEvent.type(widthInput, "4");
    userEvent.type(heightInput, "2");
    userEvent.type(doorInput, "1");

    expect(sendButton).toBeDisabled();
  });

  it("Verifica se ao clicar no botão Voltar o formulario é renderizado novamente", () => {
    render(<RenderInks inks={ink} area={inputFields} />);

    const buttonBack = screen.getByTestId("button-back");

    userEvent.click(buttonBack);

    expect(reload_func).toHaveBeenCalled();
  });
});

describe("Teste - Alertas", () => {
  it("Verifica se o alerta de Área de janelas e portas aparece corretamente na tela", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const windowInput = screen.getByTestId("window-input-0");

    userEvent.type(widthInput, "3");
    userEvent.type(heightInput, "3");
    userEvent.type(windowInput, "2");

    expect(invalid_windoor).toHaveBeenCalled();
  });

  it("Verifica se o alerta para altura e comprimento aparece corretamente na tela", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");

    userEvent.type(widthInput, "10");
    userEvent.type(heightInput, "10");

    expect(invalid_area).toHaveBeenCalled();
  });

  it("Verifica se o alerta de Altura das paredes aparece corretamente na tela", () => {
    render(<App />);
    const heightInput = screen.getByTestId("height-input-0");
    const doorInput = screen.getByTestId("door-input-0");

    userEvent.type(heightInput, "2");
    userEvent.type(doorInput, "1");

    expect(invalid_door).toHaveBeenCalled();
  });
});

describe("Teste - Funcionalidades", () => {
  it("Verifica se ao digitar altura e comprimento validos e clicar em Enviar outros inputs são renderizados na tela", () => {
    render(<App />);

    const widthInput = screen.getByTestId("width-input-0");
    const heightInput = screen.getByTestId("height-input-0");
    const sendButton = screen.getByTestId("send-button");

    userEvent.type(widthInput, "4");
    userEvent.type(heightInput, "4");
    userEvent.click(sendButton);

    const inputs = screen.getAllByRole("application");

    expect(inputs).toHaveLength(2);
  });

  it("Verifica se ao digitar altura e comprimento validos para as quatro paredes e clicar em Enviar o resultado é renderizado corretamente", () => {
    render(<App />);

    for (let i = 0; i < numberFour; i += 1) {
      const widthInput = screen.getByTestId(`width-input-${i}`);
      const heightInput = screen.getByTestId(`height-input-${i}`);
      const sendButton = screen.getByTestId(`send-button`);

      userEvent.type(widthInput, "4");
      userEvent.type(heightInput, "4");
      userEvent.click(sendButton);
    }

    const result = screen.getByTestId("result-p");

    expect(result).toHaveTextContent(/64.00 m²/);
  });

  it("Verifica se a quantidade de tinta está correta de acordo com a área das paredes", () => {
    render(<App />);

    for (let i = 0; i < numberFour; i += 1) {
      const widthInput = screen.getByTestId(`width-input-${i}`);
      const heightInput = screen.getByTestId(`height-input-${i}`);
      const windowInput = screen.getByTestId(`window-input-${i}`);
      const doorInput = screen.getByTestId(`door-input-${i}`);

      const sendButton = screen.getByTestId(`send-button`);

      userEvent.type(widthInput, "4");
      userEvent.type(heightInput, "4");

      if (i == 1) {
        userEvent.type(windowInput, "1");
      } else if (i == 2) {
        userEvent.type(doorInput, "1");
      } else if (i == 3) {
        userEvent.type(windowInput, "1");
      }

      userEvent.click(sendButton);
    }

    const result = screen.getByTestId("result-p");
    const resultInk = screen.getByTestId("result-ink-0");
    const resultInk2 = screen.getByTestId("result-ink-1");

    expect(result).toHaveTextContent(/57.68 m²/);
    expect(resultInk).toHaveTextContent("3 Lata(s) de 3.6 L de tinta");
    expect(resultInk2).toHaveTextContent("1 Lata(s) de 0.5 L de tinta");
  });
});
