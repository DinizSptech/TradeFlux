#!/bin/bash

# Script para verificar e configurar o arquivo .env.dev e preservar apenas arquivos importantes (Dando uma de garbage collector)
# Pra rodar é a msm história do NodeJS:

# nano configurar_env.sh
# Aí vc copia tudo que tá aqui e dá o comando abaixo:
# chmod +x configurar_env.sh && sudo ./configurar_env.sh

echo "=== Verificando e configurando arquivo .env.dev ==="

# Diretório do projeto
# Só explicando, pq não lembro de ter explicado isso, mas esses coisos tipo o "PROJETO" são basicamente as variáveis
PROJETO="/home/ubuntu/TradeFlux"

# Se pirulitando para o diretório do Tradeflux
cd "$PROJETO"

# As nossa configurações para conseguir rodar a aplicação
ENV="AMBIENTE_PROCESSO=desenvolvimento
# Configurações de conexão com o banco de dados
DB_HOST=localhost
DB_DATABASE='tradefluxFrio'
DB_USER='root'
DB_PASSWORD='urubu100'
DB_PORT=1730
# Configurações do servidor de aplicação
APP_PORT=8080
APP_HOST=44.216.78.224"

# Criando o EnvDev (> isso daí é pra basicamente mandar o que tá nessa variavél para um env, pensa que é tipo a setinha mandando uma variavel para um arquivo)
echo "$ENV" > .env.dev

echo " === Criando lista de diretórios e arquivos para preservar ==="

# Aí pra vcs, como fazer um array (Não me perguntem pq, mas a diferença entre cada objeto de um array em shell script é um espaço e muita fé)
LISTA=(
  "src"
  "public"
  "node_modules"
  ".env"
  ".env.dev"
  "app.js"
  "LICENSE"
  "package-lock.json"
  "package.json"
)

# Aqui a gente só tá criando um backup temporário numa outra pasta pra preservar os arquivos importantes
echo "=== Criando backup temporário dos arquivos importantes ==="
DIRETEMPOR=$(mktemp -d)
# Tipo, pensa assim, o mkdir cria os diretórios, aí o mktemp tá criando o temporário e salvando no DIRETEMPOR (O -d é pra diretório, se não, ele criaria só um arquivo, normalmente, se eu não me engano, isso é criado lá no tmp que a gente viu na aula do Edu há 5 milênios de anos atrás)

# O for é basicamente que nem no Python/R e o for Enhaced do Java
# O -e que eu uso bastante aqui, é basicamente de Exits ou sla como escreve, basicamente ele vê se o arquivo existe

# ${LISTA[@]} basicamente vai pegar cada item do array separadamente, seguindo a divisão que eles fazem pelo " ".

# ${LISTA[*]} basicamente o toString pq ele junta tudo num único string, separado por espaços (pode dar caduco se tiver item com espaço tipo Maria Joaquina, tem chance de dividir em Maria e Joaquina).
# Tipo assim ó:
# Nome: Maria
# Nome: Joaquina

for atual in "${LISTA[@]}"; do
  if [ -e "$atual" ]; then
# Só por termos de curiosidade, os if e afins do Shell são entre [], diferente do comum que normalmente é entre (), eles são meio estranho msm
    cp -r "$atual" "$DIRETEMPOR/"
  fi
# Note que fi é if ao contrário, basicamente um "O pessoal, aqui qeue eu acabo", diferente do comum {}
done

# E aqui damos uma de garbage collector derrubando tudo que existe
echo "Removendo diretórios e arquivos desnecessários..."
for atual in "$PROJETO"/*; do
# Esse /* é pra pegar aqueles arquivos ocultos que a Célinha falou em aula uma vez, descobri que o GitIgnore é um desses
  [ ! -e "$atual" ] && continue
  [ "$atual" = "$DIRETEMPOR" ] && continue
# Aqui a gente pula o que não queremos, ou seja as coisas do diretório temporário

  base_name=$(basename "$atual")

  if printf '%s\n' "${LISTA[@]}" | grep -qx "$base_name"; then
    continue
  fi
#Esse daqui é mais complicadinho e eu tive que pesquisar bastante pra conseguir fazer, mas grep -qx "$base_name" basicamente faz isso aqui ó:
#-q: Modo silencioso (não printa nada, só define sucesso ou falha, tipo o argumento -p eu acho, do docker, que ele cria sem mostrar nada, só vai lá e faz).
#-x: Exige que a linha inteira seja igual (não só uma parte, tipo o ===, que verifica tudo) 

  echo "=== Removendo: $base_name ==="
  rm -rf "$atual"
# E aqui, a parte mais facíl, que é só apagando o arquivo com o RM
done
 
# Resumo super super super generalizado:
# Para cada coisa no projeto: se não existir ou for o backup temporário (Aquele DireTempor que criamos), ignora.
# Se o nome for um dos que queremos manter, ignora.
# Se não for, mostra na tela o que é e remove, o apagando.

# O basename serve pq a gente pega o caminho todo, aí pra fazer a comparação, daria meio errado, pq na lista tá só o nome final, aí usamos esse basename pra pegar só o último, tipo ao ínves de pegarmos caminhoTeste/arquivoQueEuQuero.txt, pegamos apenas: arquivoQueEuQuero.txt

# Restaura os arquivos importantes
echo "=== Restaurando arquivos importantes ==="
for atual in "$DIRETEMPOR"/*; do
  base_name=$(basename "$atual")
  cp -r "$atual" "$PROJETO/"
  echo "=== Preservado: $base_name ==="
done

# Limpar diretório temporário
rm -rf "$DIRETEMPOR"

echo "=== Removendo os Scripts SQL e os Scripts Shell utilizados em outros momentos ==="

cd ..

LISTA=(
  "bdFrio.sql"
  "bdQuente.sql"
  "configurar_env.sh"
  "instalar_nodejs_tradeflux.sh"
  "utilizando_docker.sh"
)

for atual in "${LISTA[@]}"; do
  if [ -e "$atual" ]; then
    rm "$atual"
  fi
done

echo " === Limpeza concluída! Apenas os arquivos e diretórios essenciais foram mantidos. ==="

echo " === Instalando os módulos necessários. ==="

cd "$PROJETO"

# Executar npm run dev
echo "=== Iniciando a aplicação em modo de desenvolvimento ==="
npm run dev