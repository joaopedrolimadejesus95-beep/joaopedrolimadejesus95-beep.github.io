# Portfólio · João Pedro Lima de Jesus

Meu site pessoal de desenvolvedor: quem sou, o que estou construindo e onde conferir cada projeto.

🔗 **https://joaopedrolimadejesus95-beep.github.io**

## Decisões

- **HTML, CSS e JavaScript puro, sem framework.** O site é estático e pequeno; um framework só adicionaria build e dependências sem ganho real.
- **Fontes e ícones hospedados no próprio repositório** (`assets/fonts` e `assets/icons`), sem depender de CDN externo.
- **Acessível:** link "pular para o conteúdo", foco visível no teclado, menu com `aria-expanded`, textos alternativos e respeito à preferência de **movimento reduzido** do sistema (desliga animações).
- **Funciona sem JavaScript:** as animações de entrada só são ativadas quando o JS carrega (classe `js` no `<html>`), então o conteúdo nunca fica escondido.

## Estrutura

```
├── index.html              # todo o conteúdo do site
└── assets/
    ├── css/style.css       # estilos (cores e medidas em variáveis no :root)
    ├── js/main.js          # menu, seção atual, filtro de projetos, animações
    ├── img/                # prints dos projetos e favicon
    ├── icons/              # ícones das tecnologias (Devicon)
    ├── fonts/              # Space Grotesk, Inter e JetBrains Mono
    └── docs/               # currículo em PDF
```

## Como atualizar

- **Adicionar um projeto:** copie um `<article class="projeto">` no `index.html`, troque o conteúdo e ajuste o `data-tags` (ex: `data-tags="java ia"`) pra ele aparecer nos filtros certos.
- **Trocar a cor de destaque:** mude `--roxo` e `--roxo-claro` no topo do `style.css`.
- **Atualizar o currículo:** substitua `assets/docs/curriculo-joao-pedro-lima.pdf` mantendo o mesmo nome.

## Rodar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## Créditos

Ícones de tecnologia: [Devicon](https://devicon.dev) (MIT). Fontes: Space Grotesk, Inter e JetBrains Mono (SIL Open Font License).
