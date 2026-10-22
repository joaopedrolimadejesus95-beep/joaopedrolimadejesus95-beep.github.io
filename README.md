# Portfólio · João Pedro Lima de Jesus

![Capa do portfólio](assets/img/capa-compartilhamento.png)

Meu site pessoal de desenvolvedor: quem sou, o que estou construindo e onde conferir cada projeto.

🔗 **https://joaopedrolimadejesus95-beep.github.io**

## O que tem no site

| Seção | Conteúdo |
|---|---|
| **Início** | Apresentação, currículo em PDF e links de contato |
| **Sobre mim** | Formação, o que me interessa e como cheguei até aqui |
| **Habilidades** | Separadas entre o que já usei em projetos e o que estou estudando |
| **Projetos** | Vendly e ATLAS em destaque, mais Mentora, Sistema Acadêmico, Genius IA e Algoritmos JS, com filtro por tecnologia |
| **Eventos** | NASA Space Apps Challenge e Ideathon Sebrae |
| **Trajetória** | Linha do tempo: curso técnico, Havan, UTFPR e Vendly |
| **Certificações** | Google Cloud, DIO e Alura |
| **Contato** | E-mail (com botão de copiar), LinkedIn e GitHub |

## Decisões

- **HTML, CSS e JavaScript puro, sem framework.** O site é estático e pequeno; um framework só adicionaria build e dependências sem ganho real.
- **Fontes e ícones no próprio repositório** (`assets/fonts` e `assets/icons`), sem depender de CDN externo.
- **Acessível:** link "pular para o conteúdo", foco visível no teclado, menu com `aria-expanded`, textos alternativos e respeito à preferência de **movimento reduzido** do sistema (desliga as animações).
- **Funciona sem JavaScript:** as animações de entrada só são ativadas quando o JS carrega (classe `js` no `<html>`), então o conteúdo nunca fica escondido.
- **Prévia ao compartilhar:** tags Open Graph com uma capa própria em 1200×627, o formato que LinkedIn e WhatsApp usam.

## Como o JavaScript funciona

Tudo está em [`assets/js/main.js`](assets/js/main.js), sem bibliotecas:

- **Seção atual no menu:** um `IntersectionObserver` observa as seções e marca no menu a que está no meio da tela.
- **Animação de entrada:** outro `IntersectionObserver` adiciona a classe `visivel` quando um card aparece, uma vez só.
- **Filtro de projetos:** cada projeto tem um `data-tags` (ex: `data-tags="node seguranca"`); o filtro esconde os que não têm a tag escolhida.
- **Copiar e-mail:** usa a `navigator.clipboard` e, se o navegador bloquear, mostra o e-mail pra copiar à mão.

## Estrutura

```
├── index.html              # todo o conteúdo do site
└── assets/
    ├── css/style.css       # estilos (cores e medidas em variáveis no :root)
    ├── js/main.js          # menu, seção atual, filtro de projetos, animações
    ├── img/                # prints dos projetos, capa de compartilhamento e favicon
    ├── icons/              # ícones das tecnologias (Devicon)
    ├── fonts/              # Space Grotesk, Inter e JetBrains Mono
    └── docs/               # currículo em PDF
```

## Como atualizar

- **Adicionar um projeto:** copie um `<article class="projeto">` no `index.html`, troque o conteúdo e ajuste o `data-tags` pra ele aparecer nos filtros certos.
- **Adicionar um evento:** copie um `<article class="evento">` dentro da seção `#eventos`.
- **Trocar a cor de destaque:** mude `--roxo` e `--roxo-claro` no topo do `style.css`.
- **Atualizar o currículo:** substitua `assets/docs/curriculo-joao-pedro-lima.pdf` mantendo o mesmo nome.

## Rodar localmente

```bash
python -m http.server 8000
# abra http://localhost:8000
```

## Créditos

Ícones de tecnologia: [Devicon](https://devicon.dev) (MIT). Fontes: Space Grotesk, Inter e JetBrains Mono (SIL Open Font License).
