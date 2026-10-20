// Interações do portfólio: menu, seção atual, filtro de projetos,
// animação de entrada e botão de copiar e-mail.
// Sem bibliotecas: tudo com APIs do próprio navegador.

const topo = document.getElementById("topo");
const menu = document.getElementById("menu");
const menuBotao = document.querySelector(".menu-botao");
const linksMenu = menu.querySelectorAll("a");

// ---------- borda do topo ao rolar ----------

function atualizarTopo() {
    topo.classList.toggle("rolou", window.scrollY > 10);
}
window.addEventListener("scroll", atualizarTopo, { passive: true });
atualizarTopo();

// ---------- menu no celular ----------

function fecharMenu() {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    menuBotao.setAttribute("aria-label", "Abrir menu");
}

menuBotao.addEventListener("click", () => {
    const abrir = !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", abrir);
    menuBotao.setAttribute("aria-expanded", String(abrir));
    menuBotao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
});

linksMenu.forEach((link) => link.addEventListener("click", fecharMenu));
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();
});

// ---------- destaca no menu a seção que está na tela ----------

const secoes = [...linksMenu].map((link) => document.querySelector(link.getAttribute("href")));

const observadorSecao = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (!entrada.isIntersecting) return;
            linksMenu.forEach((link) => {
                const atual = link.getAttribute("href") === `#${entrada.target.id}`;
                link.classList.toggle("atual", atual);
                if (atual) link.setAttribute("aria-current", "true");
                else link.removeAttribute("aria-current");
            });
        });
    },
    // considera "atual" a seção que cruza a faixa do meio da tela
    { rootMargin: "-45% 0px -50% 0px" }
);
secoes.forEach((secao) => secao && observadorSecao.observe(secao));

// ---------- filtro de projetos ----------

const filtros = document.querySelectorAll(".filtro");
const projetos = document.querySelectorAll(".projeto");
const avisoVazio = document.querySelector(".filtro-vazio");

filtros.forEach((botao) => {
    botao.addEventListener("click", () => {
        const escolhido = botao.dataset.filtro;

        filtros.forEach((b) => {
            const ativo = b === botao;
            b.classList.toggle("ativo", ativo);
            b.setAttribute("aria-pressed", String(ativo));
        });

        let visiveis = 0;
        projetos.forEach((projeto) => {
            const tags = projeto.dataset.tags.split(" ");
            const mostrar = escolhido === "todos" || tags.includes(escolhido);
            projeto.hidden = !mostrar;
            if (mostrar) {
                visiveis++;
                projeto.classList.add("visivel"); // garante que não fique invisível pela animação
            }
        });

        avisoVazio.hidden = visiveis > 0;
    });
});

// ---------- animação de entrada ----------

const elementosRevelar = document.querySelectorAll(".revelar");

const observadorRevelar = new IntersectionObserver(
    (entradas, observador) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");
                observador.unobserve(entrada.target); // anima só uma vez
            }
        });
    },
    { threshold: 0.12 }
);
elementosRevelar.forEach((el) => observadorRevelar.observe(el));

// ---------- copiar e-mail ----------

const botaoCopiar = document.getElementById("copiar-email");
const avisoCopia = document.getElementById("aviso-copia");
const EMAIL = "joaopedrolimajpldj@gmail.com";

botaoCopiar.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(EMAIL);
        avisoCopia.textContent = "E-mail copiado!";
    } catch {
        // alguns navegadores bloqueiam a área de transferência: mostra o e-mail pra copiar à mão
        avisoCopia.textContent = `Não consegui copiar automaticamente: ${EMAIL}`;
    }
    setTimeout(() => (avisoCopia.textContent = ""), 3000);
});
