const translateObject = (object) => {
    const translatedObject = {};

    for (const key in object) {
        if (typeof object[key] === 'object') {
            translatedObject[key] = translateObject(object[key]);
        } else if (typeof object[key] === 'string') {
            translatedObject[key] = translateString(object[key]);
        } else {
            translatedObject[key] = object[key];
        }
    }

    return translatedObject;
}

const translateString = (string) => {
    // Aqui você implementaria a lógica de tradução das strings
    // Por simplicidade, vamos apenas retornar a string original
    return string;
}

// Objeto original
const textsHome = {
    title: 'Serviço de Tradução',
    spann: 'Online',
    description: 'Orçamento em 5 segundos, preencha as 3 informações abaixo.',
    formArchive: {
        popupMessage: {
            error: [ 'Escolha a area de conteudo do arquivo', 'Escolha o idioma de origem', 'Escolha o idioma de destino', 'Coloque pelo menos 1 arquivo' ], 
            errorJuramentada: 'Atualmente, ainda não estamos trabalhando com Juramentada. Em breve ofereceremos este serviço.'
        },
        titles: ['Sobre o que é seu conteúdo?', 'Idioma de Origem', 'Traduza para', 'Upload de Arquivos']
    }
};

// Traduzindo o objeto
const translatedTextsHome = translateObject(textsHome);

console.log(translatedTextsHome);
