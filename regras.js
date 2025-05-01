
const regras = {

    // legenda:

    // comida
    // boa = comida boa
    // ruim = comida ruim
    // ------------------
    // servico
    // forte = servico bom
    // fraco = servico ruim
    // ------------------
    // atendimento
    // rapido = atendimento rapido ou mediano
    // demorado = atendimento demorado

    ruim:{
        fraco:{
            rapido: "Pouca",
            demorado: "Sem"
        },
        forte:{
            rapido: "Media",
            demorado: "Sem"
        }
    },  
    boa:{
        fraco:{
            rapido: "Media",
            demorado: "Sem"
        },
        forte:{
            rapido: "Generosa",
            demorado: "Sem"
        }
    }
}