# menu-problem

[![Build Status](https://travis-ci.org/wagoid/menu-problem.svg?branch=master)](https://travis-ci.org/wagoid/menu-problem)
[![Coverage Status](https://coveralls.io/repos/github/wagoid/menu-problem/badge.svg?branch=master)](https://coveralls.io/github/wagoid/menu-problem?branch=master)

Três implementações da solução do problema do menu, que pode ser encontrado [aqui](http://www.spoj.com/problems/MENU/). A pimeira é um algoritmo guloso, a segunda solução utiliza a técnica de programação dinâmica, e a terceira utiliza backtracking.

## Como executar as soluções

1. Instale o Node.js [na versão 6 ou acima](https://nodejs.org/en/download/current/)
2. Abra o console de sua preferência (bash, Powershell, cmd).
3. Vá para a pasta do projeto (exemplo: `cd /c/menu-problem`).
4. Digite o comando `node src/menuSolver.js [solução a ser utilizada] [arquivo de casos de teste]`. 
As opções de solução são "greedy" para algoritmo guloso, "dynamic" para programação dinâmica e "backtracking" para backtracking. O arquivo de casos de teste representa o caminho do arquivo a ser utilizado para se encontrar as soluções, relativos à pasta "src" do projeto. Por padrão será utilizado o arquivo "problemas.txt" que está na pasta "src". 
Exemplo de comando: `node src/menuSolver.js greedy`.

## Perguntas sobre os algoritmos

1. Como esse problema pode ser modelado para a técnica Algoritmo Guloso?


O problema pode ser modelado para a técnica de algoritmo guloso buscando sempre os pratos que possuem a melhor razão entre o valor do prato e o seu custo, ou seja, quanto maior o resultado da razão valor/custo, melhor o prato. Iremos chamar essa razão de fitness.

Como os pratos vão perdendo o valor com o uso, temos que sempre atualizar o fitness do prato. Portanto, sempre que adicionamos um novo prato à lista de pratos a serem utilizados, realizamos uma atualização do fitness de todos os pratos que já foram utilizados até o momento. Com isso, a cada escolha de prato, seu fitness é diminuído, pois o seu valor é diminuído pela metade (ou diminuído para 0), e pratos que possuíam anteriormente seu valor diminuído pela metade têm seu fitness aumentado (pois seus valores são restaurados ao valor inicial).


2. Seu Algoritmo Guloso dá a solução ótima? Por quê?


O algoritmo guloso implementado não dá solução ótima. Como ele apenas analisa soluções ótimas locais para buscar a solução, não há garantia de que a solução ótima global será encontrada pelo algoritmo. Ele com certeza irá encontrar a solução que apresenta maior lucro, mas não necessariamente encontrará a solução com menor custo.


3. Como esse problema pode ser modelado para o paradigma de Programação Dinâmica?


Criando uma matriz de pratos por dias. Depois de criada, ela é preenchida utilizando funções de analisam o melhor custo/beneficio, atualizando os valores do prato para cada posição da matriz. 


4. Discuta a sub-estrutura ótima e a sobreposição dos problemas.

A subestrutura ótima do problema consiste no prato que possui melhor relação entre o preço e o custo, ou seja, que possuir melhor custo benefício. Através da verificação de da estrutura ja gerada, podemos verificar a sub-estrutura otima ja gerada e buscar uma solução melhor para o problema atraves da reverificação dos pratos para as novas condições da matriz. 


5. Se algum algoritmo clássico foi adaptado para resolver o problema, qual foi ele?


Não foi adaptado nenhum algoritmo clássico.


6. Como sua implementação se comporta em termos de tempo de execução e memória alocada?

A leitura do  arquivo esta sendo realizada de maneira assincrona. Logo assim que um problema completo é lido sua execução é iniciada, não sobrecarregando a memoria do computador com os dados do arquivo que ainda serão executados.
O tempo de execução mais rapido é através da solução gulosa, seguido pela dinamica e então o retroceso.

A complexidade da técnica dinâmica no melhor caso é O(numeroDePratos²). Já no pior caso a complexidade é O(numeroDeDias * numeroDePratos³).

A complexidae da técnica de algoritmo guloso é O(numeroDePratos), e no pior caso é O(dia * numeroDePratos²);

Não conseguimos analisar a complexidade do algoritmo de retrocesso, devido ao nível de complexidade da recursão, já que ela cria possibilidades com repetição.

Criamos um teste com 30 dias, 22 pratos e um orçamento de 120, para analisarmos a diferença de performance entre os testes.
Nesse teste, o algoritmo guloso gastou 1 milissegundo para resolver, e o algoritmo de programação dinâmica gastou 30 milissegundos. Já para o algoritmo que utilizou a técnica de retrocesso, não conseguimos um tempo. Rodamos o algoritmo por mais de 1 minuto, e mesmo assim este não encontrou a solução. Seu gasto de memória apenas continuou aumentando continuamente, devido às possibilidades que o algoritmo estava criando. 

A imagem a seguir apresenta o consumo de memória do algoritmo de retrocesso. O consumo de processador se manteve em média em 25% e paramos a sua execução ao alcançar 527 MB de consumo de memória. Nos algoritmos guloso e de programação dinâmica, não conseguimos registrar o consumo, devido ao baixo tempo de execução.