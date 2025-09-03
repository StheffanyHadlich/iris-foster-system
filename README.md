# **ÍRIS**
Um sistema open-source para gerenciamento de pets, com o objetivo de cadastrar, acompanhar, gerenciar bichinhos, entre outras funções que serão adicionadas futuramente. 
Será desenvolvido com um front-end e back-end em Next.js e um banco hospedado no PostgreSQL.

# BANCO DE DADOS
O banco de dados vai armazenar os dados principais do gerenciamento dos pets, como dados pessoais, histórico médico, processo de adoção e dos adotantes. Vai ser usado **PostgreSQL** por ser um banco de dados relacional robusto e mais utilizado para aplicações web com **Next.js**.

## Entidades

**Pet**: Representa cada animal cadastrado

**Adotante**: Representa quem adotou o animal, ou tem interesse

**Diário**: Todos os registros sobre alimentação, medicamentos, peso, etc.

**Histórico Medico**: Todas as informações sobre consultas, diagnósticos, tratamentos, etc.

**Adoção**: Entidade responsável por conectar o Pet e o Adotante


## Atributos

**Usuario**
* id
* nome
* email
* data_criacao

**Pets**:
* id (PK)
* nome
* idade
* tipo
* raça
* peso_atual
* foto_url
* status(disponível, em adoção, adotato)
* data_cadastro

**Adotante**:
* id (PK)
* nome
* email
* telefone
* endereco

**Diario**:

* id (PK)
* pets_id (FK-Pets.id)
* registro_diario
* peso
* notas (texto livre)
* observacao_receita (texto livre)

**Histórico Medico**
* id (PK)
* pets_id (FK-Pets.id)
* data_consulta
* veterinario
* diagnostico
* tratamento
* receita

**Adoção**
* id(PK)
* pets_id (FK-Pets.id)
* adotante_id (FK-Adotante.id)
* data_inicio
* data_fim (se houver)
* status (ativa, finalizada, cancelada)

## Relacionamentos
* Pet - Diario > 1:N (um pet pode ter vários registros no diário)
* Pet - Historico Médico > 1:N (um pet pode ter várias consultas)
* Pet - Adoção - Adotante > N:M (um pet pode estar associado a diferentes adotantes adotantes. Assim como um adotante pode ter vários pets)

## DER - Diagrama Entidade-Relacionamento

![Diagrama ER](./docs/der/der.png)