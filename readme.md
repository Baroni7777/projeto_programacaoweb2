Instalar Seguintes extensões.

prettier
eslint
ES7+ React/Redux/React-Native snippets




Anotações:

1.
Nest sempre trabalha por modulos, exemplo, no banco tem as tabelas aluno, professor, etc
na programação tera o modulo aluno, professor, etc, para cada entidade, um modulo para gestão sempre esta estrutura.

2.
Arquivo: src/app.module.ts, é uma classe que precisa de 3 coisas basicas. 1-import, 3-controller, 3-provider.

Controller- é responsavel por ficar escutando as requisições, o cliente fez o pedido, e o controller tras o serviço para disponibilização.

Provider- é um serviço, Controller recebe, passa pro serviço, serviço processe devolve pro controller.
serviço é responsavel por todo o processamento, antes de gravar ou devolver pro usuario, são sa regras de negocios.


@module, a classe é um modulo. o modulo gerecia as importações, os conroladores e os providers.



3- tudo começa no main.ts. nest factory chama o appModule. por padrão, pode ser alterado, mas precisa em mudar nos devidos locais.

Listen escuta o endereço da porta.



O main carrega o modulo, e o app module carrega todos os modulos do sistema, acionar no controller, modulo de controller e no app.module




Service processa as regras de negocio, toda a entidade existente, antes de gravar no banco faz no service.

O controler recebe, passa pro service, o service processa, retorna pro controller, e controller devolve a informação. Controller só chama e recebe, nunca processa(algumas esceçoes)

Pediu pra criar, rota criar recebeu, passa pro servico, processa e retorna pro controller, tudo dando certo, devolve pro cliente.

Cada linguagem tem sua particularidade, a forma é a mesma porem muda a sintaxe.


Regra do solid, cada classe faz uma tarefa.
Melhor pra manter.


No controller toda a resposta é convertida para um json 


quando é erro nao converte para json, precisa de ser convertido manualmente 
