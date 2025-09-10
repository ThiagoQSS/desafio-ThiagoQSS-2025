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
  }

  static resetResultado() {
    AbrigoAnimais.resultado = { lista: [], erro: '' };
  }

  /**
   * Checa os erros de acordo com os parâmetros
   * @param {array} brinquedosPessoa1Array
   * @param {array} brinquedosPessoa2Array
   * @param {array} ordemAnimaisArray
   */
  static buscarErros(
    brinquedosPessoa1Array,
    brinquedosPessoa2Array,
    ordemAnimaisArray
  ) {
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
  }

  /**
   * Entrega o animal à pessoa, se possível.
   * Para que seja possível, a pessoa deve ter menos de 3 animais.
   * Se o animal for um gato, checamos os brinquedos dos animais já adotados
   * Se ela já tiver um gato, o animal n podera usar seus brinquedos.
   * @param {string} animal
   * @param {array} animaisPessoaArray
   * @returns
   */
  static entregarAnimal(animal, animaisPessoaArray) {
    // Checando se a pessoa ja tem 3 animais
    if (animaisPessoaArray.length >= 3) {
      return false;
    }
    // Checando se algum animal da pessoa quer brinquedos do gato
    const infoAnimal = AbrigoAnimais.animais.find((a) => a.nome === animal);
    if (infoAnimal.tipo == 'gato') {
      for (const adotado of animaisPessoaArray) {
        const brinquedosAdotado = AbrigoAnimais.animais.find(
          (a) => a.nome === adotado
        ).brinquedos;
        for (const brinquedo of infoAnimal.brinquedos) {
          if (brinquedosAdotado.includes(brinquedo)) {
            return false;
          }
        }
      }
    }
    // Checando se a pessoa tem gatos
    for (const adotado of animaisPessoaArray) {
      const infoAdotado = AbrigoAnimais.animais.find((a) => a.nome === adotado);
      if (infoAdotado.tipo == 'gato') {
        const brinquedosAdotado = infoAdotado.brinquedos;
        for (const brinquedo of infoAnimal.brinquedos) {
          if (brinquedosAdotado.includes(brinquedo)) {
            return false;
          }
        }
      }
    }

    animaisPessoaArray.push(animal);
    return true;
  }

  //Solução deve estar aqui, mas posso criar metodos auxiliares
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    AbrigoAnimais.resetResultado();

    // Check de erros
    const brinquedosPessoa1Array = brinquedosPessoa1.split(',');
    const brinquedosPessoa2Array = brinquedosPessoa2.split(',');
    const ordemAnimaisArray = ordemAnimais.split(',');

    AbrigoAnimais.buscarErros(
      brinquedosPessoa1Array,
      brinquedosPessoa2Array,
      ordemAnimaisArray
    );

    if (AbrigoAnimais.resultado.erro !== '') {
      AbrigoAnimais.resultado.lista = false;
      return AbrigoAnimais.resultado;
    }

    // Código da solução vem aqui
    const animaisPessoa1 = [];
    const animaisPessoa2 = [];

    for (const animal of ordemAnimaisArray) {
      const infoAnimal = AbrigoAnimais.animais.find((a) => a.nome === animal);

      const brinquedosDesejados = infoAnimal.brinquedos;

      let aptidaoPessoa1;
      let aptidaoPessoa2;

      if (infoAnimal.nome == 'Loco') {
        if (animaisPessoa1.length > 0)
          aptidaoPessoa1 = AbrigoUtils.checarAptidaoSemOrdem(
            brinquedosDesejados,
            brinquedosPessoa1Array
          );
        else
          aptidaoPessoa1 = AbrigoUtils.checarAptidaoComOrdem(
            brinquedosDesejados,
            brinquedosPessoa1Array
          );
        // console.log("Pessoa1: ", aptidaoPessoa1);
        if (animaisPessoa2.length > 0)
          aptidaoPessoa2 = AbrigoUtils.checarAptidaoSemOrdem(
            brinquedosDesejados,
            brinquedosPessoa2Array
          );
        else
          aptidaoPessoa2 = AbrigoUtils.checarAptidaoComOrdem(
            brinquedosDesejados,
            brinquedosPessoa2Array
          );
        // console.log("Pessoa2: ", aptidaoPessoa2);
      } else {
        aptidaoPessoa1 = AbrigoUtils.checarAptidaoComOrdem(
          brinquedosDesejados,
          brinquedosPessoa1Array
        );
        // console.log("Pessoa1: ", aptidaoPessoa1);
        aptidaoPessoa2 = AbrigoUtils.checarAptidaoComOrdem(
          brinquedosDesejados,
          brinquedosPessoa2Array
        );
        // console.log("Pessoa2: ", aptidaoPessoa2);
      }
      if (aptidaoPessoa1 && aptidaoPessoa2) {
        AbrigoAnimais.resultado.lista.push(`${animal} - abrigo`); // (tadinho)
      } else if (aptidaoPessoa1) {
        if (AbrigoAnimais.entregarAnimal(animal, animaisPessoa1)) {
          AbrigoAnimais.resultado.lista.push(`${animal} - pessoa 1`);
        } else {
          AbrigoAnimais.resultado.lista.push(`${animal} - abrigo`);
        }
      } else if (aptidaoPessoa2) {
        if (AbrigoAnimais.entregarAnimal(animal, animaisPessoa2)) {
          AbrigoAnimais.resultado.lista.push(`${animal} - pessoa 2`);
        } else {
          AbrigoAnimais.resultado.lista.push(`${animal} - abrigo`);
        }
      } else {
        AbrigoAnimais.resultado.lista.push(`${animal} - abrigo`);
      }
    }

    AbrigoAnimais.resultado.lista.sort();

    return AbrigoAnimais.resultado;
  }
}

class AbrigoUtils {
  static checarAptidaoComOrdem(
    brinquedosDesejadosArray,
    brinquedosPessoaArray
  ) {
    // Funcionando
    // console.log("Desejados: ", brinquedosDesejadosArray, "\nPessoa: ", brinquedosPessoaArray);
    let brinquedosRestantes = [...brinquedosPessoaArray];
    let aptidao = true;
    for (const brinquedo of brinquedosDesejadosArray) {
      if (brinquedosRestantes.includes(brinquedo)) {
        brinquedosRestantes = brinquedosRestantes.slice(
          brinquedosRestantes.indexOf(brinquedo)
        );
      } else {
        aptidao = false;
      }
    }
    return aptidao;
  }

  static checarAptidaoSemOrdem(
    brinquedosDesejadosArray,
    brinquedosPessoaArray
  ) {
    let aptidao = true;
    for (const brinquedo of brinquedosDesejadosArray) {
      if (!brinquedosPessoaArray.includes(brinquedo)) {
        aptidao = false;
      }
    }
    return aptidao;
  }
}

// Não alterar
export { AbrigoAnimais as AbrigoAnimais };
