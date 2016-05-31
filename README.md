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
