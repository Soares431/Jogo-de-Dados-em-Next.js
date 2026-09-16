"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

let cont = 0;

const valorDado = [
  { label: 1, src: "../assets/images/Dados/1.png" },
  { label: 2, src: "../assets/images/Dados/2.png" },
  { label: 3, src: "../assets/images/Dados/3.png" },
  { label: 4, src: "../assets/images/Dados/4.png" },
  { label: 5, src: "../assets/images/Dados/5.png" },
  { label: 6, src: "../assets/images/Dados/6.png" },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function Dado({ valor }) {
  return (
    <div>
      <img className={styles.img} src={valorDado[valor].src} />
      <label>{valorDado[valor].num}</label>
    </div>
  );
}

function JogoDados({
  jogada,
  onSetJogoda,
  vezJogador,
  setValorTotal,
  valorTotal,
  jogoFinalizado,
}) {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [jogou, setJogou] = useState(false);

  const handleButtonClick = () => {
    const novoValor1 = getRandomInt(1, 6);
    const novoValor2 = getRandomInt(1, 6);

    setValor1(novoValor1);
    setValor2(novoValor2);

    if (setValorTotal) setValorTotal(novoValor1 + novoValor2);

    if (onSetJogoda) {
      const vj = vezJogador === 1 ? 2 : 1;
      onSetJogoda(vj);
    }

    setJogou(true);
  };

  useEffect(() => {
    if (valorTotal === 0 && jogou) {
      setJogou(false);
    }
  }, [valorTotal]);

  return (
    <div>
      <div className={styles.dado}>
        <Dado valor={valor1} />
        <Dado valor={valor2} />
      </div>
      <button
        disabled={jogada !== vezJogador || jogou || jogoFinalizado}
        onClick={handleButtonClick}
      >
        {jogou || jogoFinalizado
          ? " - "
          : vezJogador === jogada
            ? "Sua vez"
            : "Aguarde"}
      </button>
    </div>
  );
}

export default function Home() {
  const [jogada, setJogada] = useState(1);
  const [rodada, setRodada] = useState(1);
  const [valorDado1, setValorDado1] = useState(0);
  const [valorDado2, setValorDado2] = useState(0);
  const [mensagemVitoriaRodada, setMensagemVitoriaRodada] = useState("");
  const [mensagemPrincipal, setMensagemPrincipal] = useState("");
  const [contVitoriaJogador1, setContVitoriaJogaodr1] = useState(0);
  const [contVitoriaJogador2, setContVitoriaJogaodr2] = useState(0);

  useEffect(() => {
    if (valorDado1 > 0 && valorDado2 > 0) {
      if (valorDado1 === valorDado2) {
        setMensagemVitoriaRodada("Empate");
      } else if (valorDado1 > valorDado2) {
        setMensagemVitoriaRodada("Jogador 1 venceu");
        setContVitoriaJogaodr1((vj1) => vj1 + 1);
      } else {
        setMensagemVitoriaRodada("Jogador 2 venceu");
        setContVitoriaJogaodr2((vj2) => vj2 + 1);
      }
    }
  }, [valorDado1, valorDado2]);

  useEffect(() => {
    if (rodada === 6) {
      if (contVitoriaJogador1 > contVitoriaJogador2) {
        setMensagemPrincipal("Jogador 1 Ganhou a partida");
      } else if (contVitoriaJogador2 > contVitoriaJogador1) {
        setMensagemPrincipal("Jogador 2 Ganhou a partida");
      }
    } else {
      setMensagemPrincipal(rodada);
    }
  }, [rodada, contVitoriaJogador1, contVitoriaJogador2]);

  const iniciarRodada = () => {
    setValorDado1(0);
    setValorDado2(0);
    setMensagemVitoriaRodada("");
    setJogada(1);
  };

  return (
    <div className={styles.page}>
      <h1>Jogo de dados</h1>
      <h3>
        {" "}
        {rodada <= 5
          ? "Rodada: " + mensagemPrincipal + "/ 5"
          : mensagemPrincipal}
      </h3>
      <div className={styles.jogador}>
        <JogoDados
          jogada={jogada}
          onSetJogoda={setJogada}
          vezJogador={1}
          setValorTotal={setValorDado1}
          valorTotal={valorDado1}
          jogoFinalizado={rodada === 6}
        />
        <JogoDados
          jogada={jogada}
          onSetJogoda={setJogada}
          vezJogador={2}
          setValorTotal={setValorDado2}
          valorTotal={valorDado2}
          jogoFinalizado={rodada === 6}
        />
      </div>

      {rodada === 6 && (
        <div>
          <button
            onClick={() => {
              iniciarRodada();
              setRodada(1);
            }}
          >
            Jogar novamente?{" "}
          </button>
        </div>
      )}

      {rodada <= 5 && (
        <>
          {mensagemVitoriaRodada && (
            <div>
              <h3>{mensagemVitoriaRodada}</h3>

              <button
                onClick={() => {
                  iniciarRodada();
                  setRodada((r) => r + 1);
                }}
              >
                Proxima Rodada
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
