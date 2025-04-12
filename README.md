# Projeto-Integrador

Olá! Este repositório faz parte do projeto do curso Talento Tech Parana - Cidade Porecatu. 

NOME                               |GitHub
-----------------------------------|----------------------------------------
José                               |-> https://github.com/
Rafael Tomé da Silva               |-> https://github.com/RafaelTomee
Gustavo                            |-> https://github.com/
Caio                               |-> https://github.com/
----------------------------------------------------------------------------


*** 1. PROBLEMA E CONTEXTO  ***

  Criar uma plataforma digital para o negócio da Sra. Lourdes, que inclua:
Catálogo de produtos,
Pagamentos online,
Gestão de clientes.
Dados e evidências que justificam o problema:

  1. População local: 18 mil habitantes (cidade de pequeno porte); 
  2. 70% dos negócios são familiares: o que indica baixa digitalização e gestão informal;
  3. Acesso à internet em 68% dos domicílios: há potencial para uso de plataformas digitais,
mas ainda com limitações de alcance.

O que já existe sobre isso (pesquisa rápida):

  1. WhatsApp Business: ferramenta popular e de fácil uso por pequenos empreendedores.
Permite catálogo, mensagens automáticas, e integração com pagamentos via WhatsApp
Pay.
  2. Plataformas como Shopify, Loja Integrada e Nuvemshop: oferecem soluções prontas para
e-commerce, mas exigem algum nível de conhecimento técnico ou suporte externo.
  3. Aplicativos de delivery rural ou mercados locais: soluções em crescimento, voltadas para
pequenos produtores e mercados locais (ex: App "Feira do Produtor").
  4. Programas de incentivo à digitalização de pequenos negócios: iniciativas do Sebrae,
Senai e governos estaduais que oferecem suporte técnico e capacitação.



*** 2 OBJETIVO DA SOLUÇÃO ***

 O que a equipe pretende alcançar com o
projeto?
Qual impacto esperado?
Espaço para preencher: 

Objetivo da Solução

A equipe pretende desenvolver uma plataforma digital simples, acessível e eficiente para
modernizar o Armazém do Sítio, da Sra. Lourdes. 
O objetivo é:

  Oferecer um catálogo digital de produtos, com integração ao WhatsApp para facilitar
pedidos;
* Permitir vendas online com pagamentos via Pix e cartão;
* Auxiliar na organização do negócio, com gestão básica de clientes e pedidos;
* Ampliar o alcance das vendas, atendendo não só a cidade de Loanda, mas também cidades
vizinhas;
* Incluir o negócio no meio digital, respeitando o perfil do público local, com pouco acesso à
tecnologia.

Impacto Esperado:  

* Facilitar o acesso dos clientes aos produtos, mesmo sem irem até o armazém;
* Aumentar o faturamento com vendas para outras cidades;
* Reduzir erros e melhorar o controle dos pedidos e entregas;
* Estimular o uso de soluções digitais em um contexto onde isso ainda é pouco explorado;
* Valorizar o comércio local e incentivar outros empreendedores familiares a se digitalizarem



*** 3 REFERÊNCIAS E INSPIRAÇÕES ***

  Quais soluções similares já existem?
○ que pode ser aproveitado, melhorado ou
evitado? 

Referências e Inspirações:

1. Catálogo no WhatsApp Business
Pode ser aproveitado: A simplicidade e familiaridade com o WhatsApp, que já é muito usado
em Loanda.

Pode ser melhorado: Falta integração com pagamentos e gestão de pedidos.

3. Mercado Livre / OLX Local
Pode ser aproveitado: A ideia de classificar produtos, mostrar imagens e oferecer meios de
pagamento.

Pode ser melhorado: Criar algo mais voltado para o pequeno produtor rural/artesanal, com
linguagem acessível.





*** 4. ESCOPOS (DO PROJETO E FORA DO PROJETO) ***

  O que será entregue?
O que não será feito nesta etapa?
Inclui: funcionalidades, serviços, público-alvo, limites.
Espaço para preencher:

O que será entregue (Escopo do Projeto):

* Plataforma digital simples e intuitiva, com:
* Catálogo de produtos (artesanais e hortifrúti);
* Sistema de pedidos via WhatsApp (com botão de "Comprar pelo WhatsApp");
* Gestão básica de clientes (nome, contato, histórico de pedidos);
* Painel administrativo para cadastro de produtos e visualização de vendas;
* Integração com formas de pagamento online (ex: Pix ou link do Mercado Pago);

* Treinamento inicial para uso da plataforma;
* Interface adaptada para dispositivos móveis.

Público-alvo: Sra. Lourdes e clientes das cidades próximas.

O que não será feito nesta etapa (Fora do Escopo):

* Aplicativo nativo para Android/iOS (será web responsiva);
* Integrações com ERPs ou sistemas avançados de gestão;
* Campanhas de marketing digital;
* Expansão para marketplace ou vendas em grandes plataformas (ex: Mercado Livre);
* Suporte técnico contínuo após a entrega (pode ser contratado à parte).



*** 5. REQUISITOS FUNCIONAIS E NÃO FUNCIONAIS ***

 Quais funções mínimas a solução precisa ter?
Quais condições ou restrições são importantes (ex: acessibilidade, tempo de resposta,
visual etc.)?
• Espaço para preencher:

## Requisitos Funcionais

| ID  | Descrição                          |
|-----|-------------------------------------|
| RF1 | Catálogo de produtos                |
| RF2 | Pagamento online                    |
| RF3 | Gestão de clientes                  |
| RF4 | Integração com WhatsApp             |

## Requisitos Não Funcionais

| ID   | Descrição                                                         |
|------|-------------------------------------------------------------------|
| RNF1 | Interface simples e intuitiva                                     |
| RNF2 | Funciona bem em celular e com internet limitada                   |
| RNF3 | Visual acessível e fácil de entender                              |



*** 6 TECNOLOGIAS E METODOLOGIAS ***

 Quais ferramentas, linguagens e métodos serão usados?
Justifique as escolhas.

Ferramentas e Linguagens Utilizadas:

* Flutter;

  Permite criar uma plataforma única que funciona tanto em dispositivos móveis (Android/iOS)
quanto na versão web, utilizando uma única base de código. Ideal para quem quer
escalabilidade e uniformidade nas plataformas.

* Dart;

  A linguagem padrão do Flutter, otimizada para desenvolvimento rápido, com excelente
desempenho. Dart é simples de aprender e trabalhar em conjunto com Flutter.

* Firebase;

  Firebase oferece um backend sem servidor fácil de usar, com autenticação integrada, banco
de dados em tempo real, hospedagem e notificações push. É ideal para projetos pequenos
e médios, com baixo custo e escalabilidade.

* Mercado Pago / PagSeguro;

  Plataformas seguras e amplamente utilizadas no Brasil, com fácil integração com Flutter,
permitindo que a Sra. Lourdes receba pagamentos online de forma simples e segura.

* WhatsApp API (ou links diretos);

  WhatsApp é o principal canal de comunicação da Sra. Lourdes, e a integração com o app
facilita que o cliente envie seus pedidos diretamente para ela de forma simples.

Metodologias Utilizada:
* Agile (Scrum)

  Planejamento e organização das tarefas em sprints curtas e interações constantes

  Com Flutter, podemos desenvolver partes do sistema e entregá-las de forma incremental,
ajustando conforme os feedbacks de Lourdes e dos clientes.



*** 7. CRONOGRAMA DE EXECUÇÃO (SPRINTS) ***

 Quais são as principais etapas até desenvolvimento?
Metas por semana ou por fase?
Espaço para preencher:

|Etapa              | Meta da ResponsávelSemana  |
|-------------------|----------------------------|
|Sprint 1 (Semana 1)| PLANEJAMENTO E IDEIAS      |
|Sprint 2 (Semana 2)| CONSTRUÇÃO DO SITE         |
|Sprint 3 (Semana 3)| TESTES E ENTREGA           |



*** 8. EQUIPE E RESPONSABILIDADES ***

 Quem fará quê?
Como será o acompanhamento interno?
Espaço para preencher:


Equipe e Responsabilidades:

1. Coordenador do Projeto Responsável: [josé]
   
* Acompanhar cronograma e entregas;
* Fazer a ponte entre cliente e equipe técnica;
* Gerar relatórios de progresso.

3. Desenvolvedor Front-end Responsável: [Rafael]
* Criar a interface da plataforma (catálogo, página de produto, contato via WhatsApp);
* Garantir responsividade e usabilidade.

5. Desenvolvedor Back-end Responsável: [Gustavo ]
* Implementar funcionalidades de gestão de pedidos e clientes;
* Criar sistema de autenticação e banco de dados.

7. Designer UX/UI Responsável: [Caio]
* Desenvolver layout intuitivo e acessível para o público local;
* Criar identidade visual simples e amigável.

9. Treinamento e Suporte Inicial Responsável: [Gustavo]
* Capacitar a Sra. Lourdes no uso da plataforma;
* Disponibilizar material de apoio (vídeo/tutorial simples).

---
Acompanhamento Interno

Reuniões semanais para alinhamento de progresso (online);

Uso de ferramentas de gestão (Trello ou Notion);

Atualizações de status enviadas por e-mail ou WhatsApp para a cliente;

Validações parciais com a cliente (protótipo e versão beta).

