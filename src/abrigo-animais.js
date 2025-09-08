class AbrigoAnimais {
  static animais = [
    {
      nome: 'Rex',
      tipo: 'cão',
      brinquedos: ['RATO', 'BOLA'],
    },
    {
      nome: 'Mimi',
      tipo: 'gato',
      brinquedos: ['BOLA', 'LASER'],
    },
    {
      nome: 'Fofo',
      tipo: 'gato',
      brinquedos: ['BOLA', 'RATO', 'LASER'],
    },
    {
      nome: 'Zero',
      tipo: 'gato',
      brinquedos: ['RATO', 'BOLA'],
    },
    {
      nome: 'Bola',
      tipo: 'cão',
      brinquedos: ['CAIXA', 'NOVELO'],
    },
    {
      nome: 'Bebe',
      tipo: 'cão',
      brinquedos: ['LASER', 'RATO', 'BOLA'],
    },
    {
      nome: 'Loco',
      tipo: 'jabuti',
      brinquedos: ['SKATE', 'RATO'],
    },
  ];

  static resultado = {
    lista: [],
    erro: '',
  };

  /**
   * Se o animal for inválido, seta o erro
   * @param {string} nomeAnimal
   */
  static checarAnimal(nomeAnimal) {
    if (!AbrigoAnimais.animais.find((animal) => animal.nome === nomeAnimal)) {
      AbrigoAnimais.resultado.erro = `Animal inválido`;
    }
  }

  /**
   * Se o brinquedo for inválido, seta o erro
   * @param {string} nomeAnimal
   */
  static checarBrinquedo(brinquedo) {
    // Retorna true se o brinquedo existir na lista
    if (
      !AbrigoAnimais.animais.find((animal) =>
        animal.brinquedos.includes(brinquedo)
      )
    ) {
      AbrigoAnimais.resultado.erro = `Brinquedo inválido`;
    }
  }

  /**
   *
   * @param {array} array array com os nomes
   * @param {string} tipo 'Brinquedo' ou 'Animal'
   * @returns true, se houver duplicatas
   * @returns false, se não houver duplicatas
   *
   */
  static checarDuplicatas(array, tipo) {
    const encontrados = [];
    for (const item of array) {
      if (encontrados.includes(item)) {
        AbrigoAnimais.resultado.erro = `${tipo} inválido`;
        return;
      }
      encontrados.push(item);
    }
    return false;
  }

  static resetResultado() {
    AbrigoAnimais.resultado = { lista: [], erro: '' };
  }

  //Solução deve estar aqui, mas posso criar metodos auxiliares
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    AbrigoAnimais.resetResultado();

    const brinquedosPessoa1Array = brinquedosPessoa1.split(',');
    const brinquedosPessoa2Array = brinquedosPessoa2.split(',');
    const ordemAnimaisArray = ordemAnimais.split(',');

    const animaisPessoa1 = [];
    const animaisPessoa2 = [];

    for (const animal of ordemAnimaisArray) {
      AbrigoAnimais.checarAnimal(animal);
    }
    for (const brinquedo of brinquedosPessoa1Array) {
      AbrigoAnimais.checarBrinquedo(brinquedo);
    }
    for (const brinquedo of brinquedosPessoa2Array) {
      AbrigoAnimais.checarBrinquedo(brinquedo);
    }

    AbrigoAnimais.checarDuplicatas(brinquedosPessoa1Array, 'Brinquedo');
    AbrigoAnimais.checarDuplicatas(brinquedosPessoa2Array, 'Brinquedo');
    AbrigoAnimais.checarDuplicatas(ordemAnimaisArray, 'Animal');

    if (AbrigoAnimais.resultado.erro !== '') {
      AbrigoAnimais.resultado.lista = false;
      return AbrigoAnimais.resultado;
    }

    // Código da solução vem aqui...

    return AbrigoAnimais.resultado;
  }
}

// Não alterar
export { AbrigoAnimais as AbrigoAnimais };
