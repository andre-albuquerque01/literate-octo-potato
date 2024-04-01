# Electronic system for restaurant

O sistema de comandas online oferece um serviço conveniente onde os clientes podem acompanhar seus pedidos em tempo real através do smartphone. Com a integração do CPF do cliente, os pedidos são registrados automaticamente, permitindo que o cliente acompanhe todas as adições e remoções em sua comanda. Essa solução é especialmente útil para estabelecimentos que não possuem um sistema de comandas físicas visíveis para os clientes, garantindo transparência e praticidade em todo o processo de pedido.

Para operar nosso sistema, são necessários os seguintes requisitos mínimos em sua máquina: PHP, Composer, Node.js e Docker. O PHP e o Composer são essenciais para executar o Laravel, que contém a API principal do sistema. O Node.js é necessário para executar o front-end, enquanto o Docker é utilizado para virtualizar o ambiente no qual a API é executada. Esses componentes garantem a funcionalidade e desempenho ideais do nosso sistema de forma integrada e eficiente.

Como fazer para rodar o sistema:

Faça o Download dos arquivos:

```git
https://github.com/andre-albuquerque01/literate-octo-potato.git
```

Depois entre na pasta `back-end`:

```bash
cd /literate-octo-potato/back-end
```

Inicialize os pacotes do Laravel:

```php
composer install
```

Para criar as variaveis de ambiente:

Crie um arquivo `.env` na raiz do seu projeto.
Copie o conteúdo do arquivo `.env.example` e ajuste as configurações conforme necessário.
Execute `php artisan config:cache` para aplicar as configurações do arquivo `.env`.
