// Interações do portfólio: menu, seção atual, filtro de projetos,
// animação de entrada e botão de copiar e-mail.
// Sem bibliotecas: tudo com APIs do próprio navegador.

const topo = document.getElementById("topo");
const menu = document.getElementById("menu");
const menuBotao = document.querySelector(".menu-botao");
const linksMenu = menu.querySelectorAll("a");

// ---------- borda do topo e barra de progresso ao rolar ----------

const suportaScrollTimeline = CSS.supports("animation-timeline", "scroll()");

function atualizarTopo() {
    topo.classList.toggle("rolou", window.scrollY > 10);
    if (!suportaScrollTimeline) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progresso = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        document.documentElement.style.setProperty("--progresso", progresso.toFixed(4));
    }
}
window.addEventListener("scroll", atualizarTopo, { passive: true });
atualizarTopo();

// ---------- atmosfera artística (pétalas de sakura + vaga-lumes roxos + estrelas) ----------

const canvasAtmosfera = document.getElementById("atmosfera");
const nekoSvg = document.querySelector(".neko-walk-svg");
const botaoPausarNeko = document.getElementById("controle-neko");
let animacoesPausadas = false;

if (canvasAtmosfera && canvasAtmosfera.getContext) {
    const ctx = canvasAtmosfera.getContext("2d");
    const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let largura = 0;
    let altura = 0;
    let quadroId = null;

    const particulas = [];
    const TOTAL = 34;

    function redimensionar() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        largura = window.innerWidth;
        altura = window.innerHeight;
        canvasAtmosfera.width = Math.floor(largura * dpr);
        canvasAtmosfera.height = Math.floor(altura * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function criarParticula(inicioAleatorio) {
        const tipo = Math.random() < 0.42 ? "sakura" : Math.random() < 0.74 ? "vagalume" : "estrela";
        return {
            tipo,
            x: Math.random() * largura,
            y: inicioAleatorio ? Math.random() * altura : -20,
            tamanho: tipo === "sakura" ? 3.5 + Math.random() * 4.5 : 1.2 + Math.random() * 2.1,
            vx: tipo === "sakura" ? -0.25 + Math.random() * 0.55 : (Math.random() - 0.5) * 0.18,
            vy: tipo === "sakura" ? 0.35 + Math.random() * 0.45 : -0.15 - Math.random() * 0.25,
            angulo: Math.random() * Math.PI * 2,
            giro: (Math.random() - 0.5) * 0.02,
            alfa: tipo === "estrela" ? 0.2 + Math.random() * 0.38 : 0.28 + Math.random() * 0.45
        };
    }

    function iniciarParticulas() {
        particulas.length = 0;
        for (let i = 0; i < TOTAL; i++) {
            particulas.push(criarParticula(true));
        }
    }

    function desenhar(animar) {
        ctx.clearRect(0, 0, largura, altura);
        for (let i = 0; i < particulas.length; i++) {
            const p = particulas[i];
            if (animar) {
                p.x += p.vx;
                p.y += p.vy;
                p.angulo += p.giro;
                if (p.y > altura + 24 || p.y < -28 || p.x < -28 || p.x > largura + 28) {
                    particulas[i] = criarParticula(false);
                    if (p.tipo !== "sakura") particulas[i].y = altura + 12;
                }
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angulo);
            ctx.globalAlpha = p.alfa;

            if (p.tipo === "sakura") {
                ctx.fillStyle = "#f472b6";
                ctx.beginPath();
                ctx.moveTo(0, -p.tamanho);
                ctx.quadraticCurveTo(p.tamanho * 0.95, 0, 0, p.tamanho);
                ctx.quadraticCurveTo(-p.tamanho * 0.95, 0, 0, -p.tamanho);
                ctx.fill();
            } else if (p.tipo === "vagalume") {
                ctx.fillStyle = "#c084fc";
                ctx.shadowColor = "rgba(192, 132, 252, 0.75)";
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(0, 0, p.tamanho, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = "#f5f3ff";
                ctx.beginPath();
                ctx.arc(0, 0, p.tamanho * 0.7, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function loop() {
        if (!document.hidden && !prefereMenosMovimento.matches && !animacoesPausadas) {
            desenhar(true);
            quadroId = requestAnimationFrame(loop);
        }
    }

    function aplicarEstadoAnimacao(pausar) {
        animacoesPausadas = pausar;
        if (pausar) {
            if (quadroId) {
                cancelAnimationFrame(quadroId);
                quadroId = null;
            }
            if (nekoSvg && typeof nekoSvg.pauseAnimations === "function") {
                nekoSvg.pauseAnimations();
            }
        } else {
            if (nekoSvg && typeof nekoSvg.unpauseAnimations === "function") {
                nekoSvg.unpauseAnimations();
            }
            if (!quadroId) loop();
        }
        if (botaoPausarNeko) {
            botaoPausarNeko.textContent = pausar ? "▶ Animar cena" : "❚❚ Pausar cena";
        }
    }

    redimensionar();
    iniciarParticulas();
    if (prefereMenosMovimento.matches) {
        desenhar(false);
        aplicarEstadoAnimacao(true);
    } else {
        loop();
    }

    if (botaoPausarNeko) {
        botaoPausarNeko.addEventListener("click", () => {
            aplicarEstadoAnimacao(!animacoesPausadas);
        });
    }

    window.addEventListener("resize", redimensionar, { passive: true });
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && quadroId) {
            cancelAnimationFrame(quadroId);
            quadroId = null;
        } else if (!document.hidden && !prefereMenosMovimento.matches && !animacoesPausadas && !quadroId) {
            loop();
        }
    });
}

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
document.addEventListener("click", (e) => {
    if (menu.classList.contains("aberto") && !topo.contains(e.target)) {
        fecharMenu();
    }
});
window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
    if (e.matches) fecharMenu();
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
const outrosProjetos = document.querySelector(".outros-projetos");
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
        let outrosVisiveis = 0;
        projetos.forEach((projeto) => {
            const tags = projeto.dataset.tags.split(" ");
            const mostrar = escolhido === "todos" || tags.includes(escolhido);
            projeto.hidden = !mostrar;
            if (mostrar) {
                visiveis++;
                if (projeto.classList.contains("projeto-compacto")) outrosVisiveis++;
                projeto.classList.add("visivel"); // garante que não fique invisível pela animação
            }
        });

        if (outrosProjetos) {
            outrosProjetos.hidden = outrosVisiveis === 0;
            outrosProjetos.open = escolhido !== "todos" && outrosVisiveis > 0;
        }
        avisoVazio.hidden = visiveis > 0;
    });
});

// ---------- animação de entrada ----------

const elementosRevelar = document.querySelectorAll(".revelar");

if ("IntersectionObserver" in window) {
    const observadorRevelar = new IntersectionObserver(
        (entradas, observador) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target); // anima só uma vez
                }
            });
        },
        { threshold: 0.05 }
    );
    elementosRevelar.forEach((el) => observadorRevelar.observe(el));
} else {
    elementosRevelar.forEach((el) => el.classList.add("visivel"));
}

window.addEventListener("beforeprint", () => {
    elementosRevelar.forEach((el) => el.classList.add("visivel"));
});

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
