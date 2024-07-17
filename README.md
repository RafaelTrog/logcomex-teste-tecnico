

## Teste técnico front-end Logcomex

Aplicativo de lista de tarefas (Todo App)

---

### Tecnologias Utilizadas
- Vite
- Vuejs 3
- Typescript
- Zod
- Pinia
- Vitest
- Tailwindcss
- Vee Validate
- VueUse

---

### Estrutura do Projeto
```
.
└── src/
    ├── assets            # Arquivos estáticos (imagens, CSS, etc.)
    ├── components        # Componentes Vue e testes unitários
    ├── store             # Gerenciamento de estado
    ├── App.vue           # Componente raiz
    └── main.ts           # Ponto de entrada do aplicativo
```
---

### Decisões Técnicas

#### Gerenciamento de Estado
- **Pinia**: Utilizado para gerenciar o estado global da aplicação. Pinia é uma alternativa moderna ao Vuex, oferecendo uma API mais simples e melhor integração com o Typescript.

#### Build e Desenvolvimento
- **Vite**: Vite é extremamente rápido e eficiente, proporciona uma ótima experiência de desenvolvimento e geralmente produz builds menores em comparação com bundlers tradicionais como Webpack.
 
#### Testes
- **Vitest**: Escolhido para testes unitários devido à integração com o Vue e suporte ao Typescript. Vitest é uma alternativa moderna ao Jest, oferecendo uma configuração mais simples e desempenho superior.

#### Utilitários
- **VueUse**: Utilizado para manipulação de localSTorage entre outras coisas.
- **Zod**: Validação de esquemas de dados. Validação de esquemas TypeScript, que facilita a validação e o parsing de dados.
- **Vee-Validate**: Utilizado para validação de formulários. Oferece uma boa integração com o Zod para fornecer validação tipada.


#### Estilização
- **Tailwind CSS**: Escolhido pela abordagem dinâmica, que permite construir interfaces rapidamente e de forma eficiente, com consistência.

---

### Instalação e Configuração (Comandos)
#### Instalação de dependências:
```
yarn
```
ou
```
npm i
```

#### Execução (localhost:5173)
```
yarn dev
```
ou
```
npm run dev
```

#### Execução dos testes
```
yarn test:unit
```
ou
```
npm run test:unit
```

#### Geração do Build
```
yarn build
```
ou
```
npm run build
```

#### Executar a versão buildada
```
yarn global add serve
serve -s dist
```
ou
```
npm install -g serve
serve -s dist
```

***
#### Desenvolvido por [Rafael Trog](https://rafaeltrog.com) 😎