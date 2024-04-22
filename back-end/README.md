## Como Iniciar o Sistema

### Passo 1: Download dos Arquivos

Clone o repositório:

```bash
git clone https://github.com/andre-albuquerque01/literate-octo-potato.git
```

### Passo 2: Configuração do Back-end

Entre na pasta back-end:

```bash
cd /literate-octo-potato/back-end
```

Inicialize os pacotes do Laravel:

```php
composer install
```

Crie um arquivo `.env` na raiz do seu projeto e configure as variáveis de ambiente conforme necessário.
Execute `php artisan config:cache` para aplicar as configurações do arquivo `.env`.

Inicie o servidor da API:

```bash
./vendor/bin/sail up
```

No Linux:

```bash
sudo ./vendor/bin/sail up
```

Para desativar o servidor da API:

```bash
./vendor/bin/sail down
```

No Linux:

```bash
sudo ./vendor/bin/sail down
```
