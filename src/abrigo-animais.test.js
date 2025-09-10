import { AbrigoAnimais } from './abrigo-animais';

describe('Abrigo de Animais', () => {
  // Testes de erro de entrada =======================================================================================================
  
  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'RATO,BOLA',
      'Lulu'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  }); // Correto

  test('Deve rejeitar brinquedo inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'RATO,BRINQUEDOFALSO',
      'Loco'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  }); // Correto

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'RATO,CAIXA',
      'Loco, Rex, Loco'
    );
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  }); // Correto

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,RATO',
      'RATO,CAIXA,RATO',
      'Loco, Rex, Mimi'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  }); // Correto
  
  // Testes de funcionamento do código de encontrar animais ==========================================================================

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,NOVELO',
      'Rex,Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - abrigo');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  }); 

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER',
      'Mimi,Fofo,Rex,Bola'
    );

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  }); // Correto

  test('Deve limitar quantidade de animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA',
      'LASER,SKATE,RATO,BOLA,CAIXA,NOVELO',
      'Bebe,Bola,Loco,Rex'
    );

    expect(resultado.lista[0]).toBe('Bebe - pessoa 2');
    expect(resultado.lista[1]).toBe('Bola - pessoa 2');
    expect(resultado.lista[2]).toBe('Loco - pessoa 2');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  }); // Correto

  test('Deve recusar a entrega do gato quando outro animal quiser o brinquedo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'LASER,RATO,BOLA',
      'BOLA',
      'Bebe,Zero'
    );
    expect(resultado.lista[0]).toBe('Bebe - pessoa 1');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  }) // Correto

  test('Deve recusar a entrega do animal quando um gato já usa o brinquedo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'BOLA',
      'Zero,Rex'
    );
    expect(resultado.lista[0]).toBe('Rex - abrigo');
    expect(resultado.lista[1]).toBe('Zero - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  }) // Correto

  test('Deve aceitar loco mesmo com a ordem errada quando já houver algum animal de companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE',
      'BOLA',
      'Rex,Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  }) // Correto

  test('Deve negar loco quando a ordem estiver errada e não houver algum animal de companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE',
      'BOLA',
      'Zero,Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista[1]).toBe('Zero - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  }) // Correto
});
