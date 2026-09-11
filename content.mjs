// The application, in three languages.
//
// One template (build.mjs) renders this into /index.html, /es/index.html and
// /zh/index.html — three real pages with their own <html lang> and hreflang,
// rather than one page that swaps text in the browser. The reader here is
// likely to be an ATS filter or a Hermes agent before it is a person, and a
// JavaScript translation is invisible to both.
//
// Spanish is peninsular and avoids anglicisms. Chinese is Simplified.
// The English is the version sent by email; the other two exist because the
// company's work is read in those languages too.

export const langs = [
  { code: 'en', label: 'EN', name: 'English', html: 'en-US', dir: '' },
  { code: 'es', label: 'ES', name: 'Español', html: 'es-ES', dir: 'es/' },
  { code: 'zh', label: '中文', name: '简体中文', html: 'zh-Hans', dir: 'zh/' }
];

const U = (s) => `<span class="u">${s}</span>`;
const L = (s) => `<span class="lead-in">${s}</span>`;

export const content = {
  /* ═══════════════════════════════════════════════════════════ ENGLISH ══ */
  en: {
    title: 'Javier Ponz — an open application to Nous Research',
    desc: 'An open application to Nous Research from Javier Ponz: technical support and customer-facing work on Hermes and open inference. Ten years at Apple Retail in diagnosis, support and team leadership.',
    ogDesc: 'Technical support and customer-facing work on Hermes and open inference, from someone who spent ten years being the human between people and their machines.',
    home: 'Home',
    nav: ['Who', 'What', 'When', 'Where', 'Why'],
    block: 'APPLICATION',
    portraitAlt: 'Pencil-sketch portrait of Javier Ponz',
    application: {
      mission: `${L('My mission')} is the same one on your careers page, read from the support side instead of the research side: powerful AI only reaches the many if somebody is willing to sit with the ones who do not yet know how to use it. That is not a coincidence of phrasing. It is the reason I am writing this page instead of a different one.`,
      bio: `${L('<a href="https://javierponz.technoir.cloud/">Javier Ponz</a>')} — ex-Apple Genius, now building agent systems in Aberdeen. Your careers page says that if nothing listed fits, send a description of what I would like to do here. This page is that description.`
    },
    what: { head: 'What', sub: '— what I would do at Nous, and what I already run', roles: [
      { badge: 'Support', title: 'Technical support and customer-facing work', body: 'Helping people actually adopt Hermes and run open models — translating between what the engineer means, what the sale promised, and what is really on the screen. Ten years of that exact job at Apple Retail.' },
      { badge: 'Not yet', title: 'Forward-deployed engineering', body: 'Two years into this stack, not ready for the FDE posting itself. I want a junior or supporting role near that work, carrying real support load while I close the gap.' },
      { badge: 'Groundwork', title: 'Whatever makes the first two possible', body: 'Writing the fix down, answering the same question better the second time, and staying with a problem until it runs. The unglamorous half of adoption is the half I am volunteering for.' }
    ] },
    when: { head: 'When', sub: '— availability', paras: [
      `${L('I can start immediately.')} There is no notice period to work through and no employer to leave gracefully. The consultancy is mine, which makes it the thing I would be setting aside rather than the thing I would be leaving. If the fit is right, the honest answer to when is ${U('whenever you want me')}.`,
      `I work from UK time: a full working day of overlap with Europe, and most of an afternoon with the American east coast. Ten years of retail and support ran on shifts rather than office hours, so ${U('moving my day')} to meet a team spread across time zones is a scheduling question and not an objection.`
    ] },
    where: { head: 'Where', sub: '— where I am, and how far I will go', paras: [
      `${L('Madrid, then Aberdeen.')} I am Spanish, I spent my career in Madrid, and I have left the country once already — for Scotland, with my partner. Aberdeen is where the machines described on this page physically sit.`,
      `Remote is what I am set up for and where most of this work happens. I do not think it is where all of it should happen: I would travel to meet the team, to conferences, and to customers, wherever Nous needs somebody ${U('in the room')} rather than on a call.`,
      `I would also consider relocating outright. That is a decision my partner and I would take together, weighed on both careers and on what the move actually buys us, and I would rather put it on the table now than discover later that the distance mattered.`
    ] },
    why: { head: 'Why', sub: '— why Nous, and why not the others', paras: [
      `${L('An operating system')} malleable enough for an agent to inhabit strikes me as a more interesting problem than a larger model, and probably a nearer one. Most personal computers are appliances: quick, sealed, arranged according to decisions somebody else made years ago and cannot easily revisit. For a long time that trade was reasonable, since the alternative was a machine you maintained rather than used.`,
      `Agents change what the trade costs. An agent's usefulness is bounded by the surface it can reach, and on a sealed appliance that surface is conversation and very little else.`,
      `Two efforts seem to me to be converging on this from opposite ends. Hermes and MCP decompose capability into things you can inspect: a skill is a Markdown file, a tool is a server you can read. Omarchy approaches from the system side, treating the desktop as configuration its owner is expected to edit, and describing itself as an OS for the age of agents. Between them sits the machine I would like to use, one that is ${U('proactive and shapeable')} by the person living in it.`,
      `${L('I did not arrive here from ideology.')} I grew up on Windows, because that is what a PC gamer had. Then I spent a decade inside Apple, which is to say a decade of being very good at a platform I did not own. I am now deliberately unwinding both: running Arch, Fedora and Omarchy, moving off Google services, reading up on OSINT to understand what I have been leaking for twenty years, and planning a move to GrapheneOS on my phone. It is slow and occasionally inconvenient and I have no intention of stopping.`,
      `I am not doing that because open source is fashionable. I am doing it because I watched those platforms get steadily worse for the people living inside them, from close enough to see the decisions being made. ${U('Whoever holds the primitives sets the ceiling')} on how far the machine may help you, and on a closed stack that ceiling is somebody else's product roadmap. Open weights and open primitives are what keep it in the owner's hands.`,
      `That is the practical reason I want to work at Nous rather than at a company that would pay me more to do the opposite. If open inference is going to be a real option for ordinary people and small businesses, somebody has to do the unglamorous work of ${U('making it adoptable')} — answering the questions, writing the fix down, staying with the person until it runs. I would like that to be my job.`,
      `${L('So, back to the first paragraph.')} Powerful AI in the hands of the many is a sentence that eventually has to survive contact with one real person's machine, on a bad day, with something already due. Somebody has to be there when it does. That is the job I am asking for.`
    ] },
    running: { paras: [
      `${L('I came to this through OpenClaw.')} It was the first agent I ran seriously and it did the job I gave it. What changed my mind about the category was finding Hermes — not the model, the harness. Skills are Markdown files I can open and edit. Tools are servers I can read. The loop means the setup gets better through use rather than through me reconfiguring it every week. It took a few weeks of daily use before I was confident that difference mattered as much as I thought, and I have been more right about it than I expected: when I started I was explaining to people what Hermes was, and ${U('that is no longer the conversation')}.`,
      `Reading which tool is worth someone's time, early, and being able to say why, is close to the same work as reading what is actually wrong with a machine. Both are mostly about refusing to accept the first plausible story.`
    ], runningIntro: `${L('Running now')}, on my own machines and on a VPS I administer:`, list: [
      `${L('Hermes, daily')}, as a working tool rather than a demonstration: scheduled workflows, automations, and agents with permission to touch real files.`,
      `${L('Local inference')} — llama.cpp serving a dense Qwen3 27B, GGUF at Q6, from an RTX 5090 in this machine, exposed as an API and wired into Hermes. I have also run Ollama and LM Studio. Nothing in that loop ${U('leaves the house')}, which is most of the point of it.`,
      `${L('Omarchy')} as a daily driver, alongside Arch and Fedora. It is the other half of the argument in the section above, and the first desktop I have used that expects to be edited rather than tolerated.`,
      `${L('A small web application')} in production, deployed by me with Docker, Traefik and TLS, behind a release gate that refuses to publish when a check comes back red. That one is mine end to end. <a class="u" href="https://memento.technoir.cloud/">memento.technoir.cloud</a>`
    ], tail: [
      `${L('The hardware half')} goes back much further than the software. I have been building and tuning PCs since I was a teenager — for games first, then for the pleasure of pulling the last few per cent out of a part through overclocking, which is where I learned that a machine is a negotiation between silicon and the software you ask it to run. The 5090 in this room is the same interest, grown up. It is also why local inference appealed to me before I had any argument for it: I wanted to know what my own hardware could actually do.`,
      `The other thing a decade at Apple left me with is a low tolerance for ugly work. Beautiful and useful were never in tension there, and I do not think they are here either — your own branding booklet makes that argument better than I could, and it is one of the reasons this application looks the way it does.`,
      `${L('And what I am learning')}, kept separate on purpose: vLLM, and a homelab I am building on Proxmox — a NAS beneath the hypervisor, the virtualisation and networking that come with it, Pi-hole at the edge. None of it is something I would sell yet. It is the argument in the previous section tested on my own hardware, at my own expense, where a failure costs nobody but me.`,
      `${L('Being exact about the GitHub account')}, because you will look and I would rather say it first. The <a class="u" href="https://github.com/ponzgpt/hermes-pkm-toolkit">MCP server for Markdown vaults</a> and the <a class="u" href="https://github.com/ponzgpt/mental-models-toolkit">thirty-model skill pack</a> were specified by me and written by Hermes from that specification; the design and the contents are mine, the implementation is not, and I could not walk you through either line by line. <a class="u" href="https://github.com/ponzgpt/aberdeen-daily">The Aberdeen newspaper</a> is a fork of an open Hermes project adapted to my city — one commit of seventeen is mine. I keep them public because directing an agent to build something usable is a real skill and the one I am practising, but it is not the same claim as writing it, and the two should not be listed as if they were.`
    ] },
    contact: { head: 'Contact', paras: [
      'The most useful reply would tell me which of these directions is worth pursuing and what stands between me and being obviously qualified for it. I would rather close a specific gap than guess at one.',
      'Your careers page offers long months of complete focus and constant danger, with honor and glory in the event of success. I have read that page more than once. I would take the trade.'
    ],
      applyLead: 'This application was sent from <a class="u" href="mailto:nerion89@gmail.com">nerion89@gmail.com</a>, with the following already attached:',
      applyItems: [
        'In the subject: Technical Support &amp; Customer Success — open application',
        '<a class="u" href="https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf">Resume/CV</a>',
        '<a class="u" href="/javier-ponz-prado-cover-letter.pdf">Cover Letter</a>',
        'A <a class="u" href="https://javierponz.technoir.cloud/workbench">portfolio</a> showcasing my work · <a class="u" href="https://github.com/ponzgpt">github.com/ponzgpt</a> · <a class="u" href="https://www.linkedin.com/in/javierponz">LinkedIn</a>'
      ],
      notice: 'Life before death. Strength before weakness. Journey before destination.' }
  },

  /* ═══════════════════════════════════════════════════════════ ESPAÑOL ══ */
  es: {
    title: 'Javier Ponz — candidatura abierta a Nous Research',
    desc: 'Candidatura abierta a Nous Research de Javier Ponz: soporte técnico y trato con clientes sobre Hermes e inferencia abierta. Diez años en Apple Retail en diagnóstico, atención y dirección de equipos.',
    ogDesc: 'Soporte técnico y trato con clientes sobre Hermes e inferencia abierta, de alguien que pasó diez años siendo la persona entre la gente y sus máquinas.',
    home: 'Inicio',
    nav: ['Quién', 'Qué', 'Cuándo', 'Dónde', 'Por qué'],
    block: 'CANDIDATURA',
    portraitAlt: 'Retrato a lápiz de Javier Ponz',
    application: {
      mission: `${L('Mi misión')} es la misma que aparece en vuestra página de empleo, leída desde el lado del soporte y no desde el de la investigación: la IA potente solo llega a la mayoría si alguien está dispuesto a sentarse con quienes todavía no saben usarla. No es una coincidencia de redacción. Es la razón por la que estoy escribiendo esta página y no otra.`,
      bio: `${L('<a href="https://javierponz.technoir.cloud/">Javier Ponz</a>')} — ex-Genius de Apple, ahora construyendo sistemas de agentes en Aberdeen. Vuestra página de empleo dice que, si nada de lo publicado encaja, envíe una descripción de lo que me gustaría hacer ahí. Esta página es esa descripción.`
    },
    what: { head: 'Qué', sub: '— qué haría en Nous, y qué tengo ya funcionando', roles: [
      { badge: 'Soporte', title: 'Soporte técnico y trato con clientes', body: 'Ayudar a que la gente adopte Hermes de verdad y ejecute modelos abiertos: traducir entre lo que quiere decir el ingeniero, lo que prometió la venta y lo que hay de verdad en la pantalla. Diez años haciendo exactamente eso en Apple Retail.' },
      { badge: 'Todavía no', title: 'Ingeniería desplegada en cliente', body: 'Dos años en esta pila, no estoy listo para la oferta de FDE en sí. Quiero un puesto júnior o de apoyo cerca de ese trabajo, asumiendo carga real de soporte mientras cierro la distancia.' },
      { badge: 'Base', title: 'Lo que hace posibles las dos anteriores', body: 'Dejar el arreglo por escrito, responder mejor la segunda vez a la misma pregunta, y quedarse con un problema hasta que funcione. La mitad poco lucida de la adopción es la mitad para la que me ofrezco.' }
    ] },
    when: { head: 'Cuándo', sub: '— disponibilidad', paras: [
      `${L('Puedo empezar de inmediato.')} No hay preaviso que cumplir ni empresa a la que dejar con elegancia. La consultora es mía, lo que la convierte en lo que apartaría, no en lo que dejaría atrás. Si encajo, la respuesta honesta a cuándo es ${U('cuando queráis')}.`,
      `Trabajo en horario del Reino Unido: una jornada entera de solape con Europa y buena parte de una tarde con la costa este de Estados Unidos. Diez años de tienda y de soporte fueron por turnos y no por horario de oficina, así que ${U('mover mi día')} para coincidir con un equipo repartido por husos horarios es una cuestión de calendario y no una objeción.`
    ] },
    where: { head: 'Dónde', sub: '— dónde estoy, y hasta dónde me muevo', paras: [
      `${L('Madrid, y después Aberdeen.')} Soy español, hice mi carrera en Madrid y ya he dejado el país una vez: por Escocia, con mi pareja. En Aberdeen es donde están, físicamente, las máquinas de las que habla esta página.`,
      `El remoto es para lo que estoy montado y donde ocurre la mayor parte de este trabajo. No creo que deba ocurrir ahí todo: viajaría para conocer al equipo, a congresos y a casa de los clientes, allí donde Nous necesite a alguien ${U('en la sala')} y no al otro lado de una llamada.`,
      `También me plantearía mudarme del todo. Esa es una decisión que tomaríamos mi pareja y yo juntos, pesando las dos carreras y lo que la mudanza nos dé de verdad, y prefiero ponerlo sobre la mesa ahora a descubrir más tarde que la distancia importaba.`
    ] },
    why: { head: 'Por qué', sub: '— por qué Nous, y por qué no los demás', paras: [
      `${L('Un sistema operativo')} lo bastante moldeable como para que un agente pueda habitarlo me parece un problema más interesante que un modelo más grande, y probablemente más cercano. La mayoría de los ordenadores personales son electrodomésticos: rápidos, sellados, ordenados según decisiones que tomó otro hace años y que no se pueden revisar con facilidad. Durante mucho tiempo ese trato fue razonable, porque la alternativa era una máquina que mantenías en vez de usar.`,
      `Los agentes cambian lo que cuesta ese trato. La utilidad de un agente está limitada por la superficie que alcanza, y en un aparato sellado esa superficie es la conversación y poco más.`,
      `Dos esfuerzos me parece que están convergiendo en esto desde extremos opuestos. Hermes y MCP descomponen la capacidad en cosas que puedes inspeccionar: una habilidad es un fichero Markdown, una herramienta es un servidor que puedes leer. Omarchy llega por el lado del sistema, tratando el escritorio como configuración que se espera que su dueño edite, y describiéndose como un SO para la era de los agentes. Entre los dos está la máquina que me gustaría usar: una que sea ${U('proactiva y moldeable')} por quien vive dentro de ella.`,
      `${L('No he llegado aquí por ideología.')} Crecí con Windows, porque era lo que tenía un jugador de PC. Después pasé una década dentro de Apple, que es lo mismo que decir una década siendo muy bueno en una plataforma que no era mía. Ahora estoy desmontando ambas cosas a propósito: uso Arch, Fedora y Omarchy, estoy saliendo de los servicios de Google, me estoy documentando sobre OSINT para entender qué llevo veinte años filtrando, y tengo previsto pasarme a GrapheneOS en el móvil. Es lento, a ratos incómodo, y no tengo ninguna intención de parar.`,
      `No lo hago porque el código abierto esté de moda. Lo hago porque vi cómo esas plataformas empeoraban de forma sostenida para quienes vivían dentro, y lo vi desde lo bastante cerca como para ver cómo se tomaban las decisiones. ${U('Quien tiene los primitivos pone el techo')} de hasta dónde puede ayudarte la máquina, y en una pila cerrada ese techo es la hoja de ruta de producto de otro. Los pesos abiertos y los primitivos abiertos son lo que lo mantiene en manos del dueño.`,
      `Esa es la razón práctica por la que quiero trabajar en Nous y no en una empresa que me pagaría más por hacer lo contrario. Si la inferencia abierta va a ser una opción real para gente corriente y para empresas pequeñas, alguien tiene que hacer el trabajo poco lucido de ${U('volverla adoptable')}: responder preguntas, dejar el arreglo por escrito, quedarse con la persona hasta que funcione. Me gustaría que ese fuera mi trabajo.`,
      `${L('Y así volvemos al primer párrafo.')} Que la IA potente esté en manos de la mayoría es una frase que, tarde o temprano, tiene que sobrevivir al contacto con el ordenador de una persona concreta, en un mal día y con algo que entregar. Alguien tiene que estar ahí cuando pase. Ese es el puesto que pido.`
    ] },
    running: { paras: [
      `${L('Llegué a esto por OpenClaw.')} Fue el primer agente que usé en serio y cumplió con lo que le pedí. Lo que me cambió la idea de la categoría fue encontrar Hermes: no el modelo, el armazón. Las habilidades son ficheros Markdown que puedo abrir y editar. Las herramientas son servidores que puedo leer. El bucle hace que la configuración mejore con el uso, en lugar de que yo la rehaga cada semana. Tardé unas semanas de uso diario en estar seguro de que esa diferencia importaba tanto como creía, y he acertado más de lo que esperaba: cuando empecé, explicaba a la gente qué era Hermes, y ${U('esa ya no es la conversación')}.`,
      `Leer pronto qué herramienta merece el tiempo de alguien, y saber decir por qué, es casi el mismo trabajo que leer qué le pasa de verdad a una máquina. Las dos cosas consisten sobre todo en negarse a aceptar la primera explicación plausible.`
    ], runningIntro: `${L('Funcionando ahora')}, en mis propios equipos y en un VPS que administro:`, list: [
      `${L('Hermes, a diario')}, como herramienta de trabajo y no como demostración: flujos programados, automatizaciones y agentes con permiso para tocar ficheros reales.`,
      `${L('Inferencia local')} — llama.cpp sirviendo un Qwen3 27B denso, en GGUF a Q6, desde una RTX 5090 de esta máquina, expuesto como API y conectado a Hermes. También he usado Ollama y LM Studio. Nada de ese circuito ${U('sale de casa')}, que es casi todo el sentido de hacerlo.`,
      `${L('Omarchy')} como sistema principal, junto a Arch y Fedora. Es la otra mitad del argumento de la sección anterior, y el primer escritorio que uso que espera que lo edites en vez de que lo aguantes.`,
      `${L('Una aplicación web pequeña')} en producción, desplegada por mí con Docker, Traefik y TLS, detrás de una puerta de publicación que se niega a publicar cuando una comprobación sale en rojo. Esa es mía de principio a fin. <a class="u" href="https://memento.technoir.cloud/">memento.technoir.cloud</a>`
    ], tail: [
      `${L('La mitad de hardware')} viene de mucho antes que el software. Monto y ajusto ordenadores desde adolescente: primero para juegos, después por el gusto de sacarle a una pieza el último dos por ciento con overclocking, que es donde aprendí que una máquina es una negociación entre el silicio y el software que le pides que ejecute. La 5090 de esta habitación es el mismo interés, ya crecido. También es la razón de que la inferencia local me atrajera antes de tener ningún argumento a favor: quería saber qué podía dar de sí mi propio equipo.`,
      `La otra cosa que me dejó una década en Apple es poca tolerancia al trabajo feo. Allí lo bello y lo útil nunca estuvieron enfrentados, y no creo que aquí lo estén tampoco: vuestro propio manual de marca defiende esa idea mejor de lo que yo podría, y es una de las razones de que esta candidatura tenga el aspecto que tiene.`,
      `${L('Y lo que estoy aprendiendo')}, separado a propósito: vLLM, y un homelab que estoy montando con Proxmox — un NAS bajo el hipervisor, la virtualización y la red que vienen con ello, y Pi-hole en el borde. Nada de eso es algo que vendería todavía. Es el argumento de la sección anterior puesto a prueba en mi propio equipo, a mi propia costa, donde un fallo no le cuesta nada a nadie más que a mí.`,
      `${L('Siendo exacto sobre la cuenta de GitHub')}, porque vais a mirarla y prefiero decirlo yo primero. El <a class="u" href="https://github.com/ponzgpt/hermes-pkm-toolkit">servidor MCP para carpetas de Markdown</a> y el <a class="u" href="https://github.com/ponzgpt/mental-models-toolkit">paquete de treinta modelos</a> los especifiqué yo y los escribió Hermes a partir de esa especificación; el diseño y el contenido son míos, la implementación no, y no podría recorreros ninguno de los dos línea a línea. <a class="u" href="https://github.com/ponzgpt/aberdeen-daily">El periódico de Aberdeen</a> es una bifurcación de un proyecto abierto de Hermes adaptada a mi ciudad: uno de diecisiete commits es mío. Los mantengo públicos porque dirigir a un agente para que construya algo utilizable es una habilidad real y es la que estoy practicando, pero no es la misma afirmación que haberlo escrito, y las dos cosas no deberían ir en la misma lista.`
    ] },
    contact: { head: 'Contacto', paras: [
      'La respuesta más útil sería decirme cuál de estas direcciones merece la pena y qué me separa de estar claramente cualificado para ella. Prefiero cerrar una distancia concreta que adivinar cuál es.',
      'Vuestra página de empleo ofrece largos meses de concentración absoluta y peligro constante, con honor y gloria en caso de éxito. He leído esa página más de una vez. Aceptaría el trato.'
    ],
      applyLead: 'Esta candidatura se envió desde <a class="u" href="mailto:nerion89@gmail.com">nerion89@gmail.com</a>, con lo siguiente ya adjunto:',
      applyItems: [
        'En el asunto: Technical Support &amp; Customer Success — open application',
        '<a class="u" href="https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf">CV</a>',
        '<a class="u" href="/javier-ponz-prado-cover-letter.pdf">Carta de presentación</a>',
        'Un <a class="u" href="https://javierponz.technoir.cloud/workbench">portafolio</a> con mi trabajo · <a class="u" href="https://github.com/ponzgpt">github.com/ponzgpt</a> · <a class="u" href="https://www.linkedin.com/in/javierponz">LinkedIn</a>'
      ],
      notice: 'Life before death. Strength before weakness. Journey before destination.' }
  },

  /* ══════════════════════════════════════════════════════════════ 中文 ══ */
  zh: {
    title: 'Javier Ponz — 致 Nous Research 的自荐信',
    desc: 'Javier Ponz 向 Nous Research 提交的公开求职：围绕 Hermes 与开放推理的技术支持与客户面向工作。在 Apple Retail 从事诊断、支持与团队管理十年。',
    ogDesc: '围绕 Hermes 与开放推理的技术支持与客户面向工作，来自一个用十年时间做“人与机器之间那个人”的人。',
    home: '主页',
    nav: ['谁', '做什么', '何时', '何地', '为什么'],
    block: '自荐信',
    portraitAlt: 'Javier Ponz 的铅笔素描肖像',
    application: {
      mission: `${L('我的使命')}和你们招聘页面上写的是同一件事，只是从支持这一端而不是研究这一端去读它：强大的 AI 只有在有人愿意坐下来陪那些还不会用它的人的时候，才会真正到达大多数人手里。这不是措辞上的巧合。这就是我在写这一页，而不是别的什么页面的原因。`,
      bio: `${L('<a href="https://javierponz.technoir.cloud/">Javier Ponz</a>')} — 前苹果 Genius，现在在阿伯丁构建智能体系统。你们的招聘页面写着：如果列出的岗位都不合适，就寄一份“我想在这里做什么”的说明。这一页就是那份说明。`
    },
    what: { head: '做什么', sub: '— 我想在 Nous 做什么，以及我手上已经在跑什么', roles: [
      { badge: '技术支持', title: '技术支持与面向客户的工作', body: '帮助人们真正用起 Hermes、跑起开放模型——在工程师的意思、销售的承诺和屏幕上真正显示的东西之间做翻译。我在 Apple Retail 做的正是这个，做了十年。' },
      { badge: '还不行', title: '前置部署工程（FDE）', body: '这套技术栈我学了两年，还没准备好投 FDE 这个职位本身。我想要那份工作旁边的初级或支持性岗位，在补上差距的同时承担真实的支持负荷。' },
      { badge: '打底', title: '让上面两件事成立的所有杂活', body: '把修法写下来，第二次被问到同一个问题时答得更好，陪着一个问题直到它跑通。采用过程中不体面的那一半，正是我主动要接的那一半。' }
    ] },
    when: { head: '何时', sub: '— 到岗时间', paras: [
      `${L('我可以马上开始。')}没有需要走完的通知期，也没有需要体面告别的雇主。那家咨询工作室是我自己的，所以它是我会先放下的东西，而不是我要离开的东西。如果合适，关于“何时”最诚实的回答就是${U('你们想让我什么时候来都行')}。`,
      `我按英国时间工作：与欧洲有一整个工作日的重叠，与美国东岸有大半个下午。我做了十年零售与支持，靠的是排班而不是朝九晚五，所以为了配合分布在不同时区的团队而${U('挪动我的作息')}，是排班问题，不是反对意见。`
    ] },
    where: { head: '何地', sub: '— 我在哪里，以及我愿意走多远', paras: [
      `${L('先是马德里，后来是阿伯丁。')}我是西班牙人，职业生涯在马德里度过，也已经离开过一次自己的国家——为了苏格兰，和我的伴侣一起。这一页里提到的那些机器，就放在阿伯丁。`,
      `远程是我已经配置好的方式，这份工作的大部分也确实发生在远程。但我不认为它应该全部发生在远程：只要 Nous 需要有人${U('在现场')}而不是在通话的另一端，我愿意出差去见团队、去参加会议、去客户那里。`,
      `我也会认真考虑彻底搬迁。那是我和我的伴侣要一起做的决定，要把两个人的职业和这次搬家真正换来的东西一起放上秤；与其以后才发现距离是个问题，不如现在就把它摆到桌面上。`
    ] },
    why: { head: '为什么', sub: '— 为什么是 Nous，而不是别家', paras: [
      `${L('一个操作系统')}，可塑到足以让智能体住进去——在我看来这比更大的模型更有意思，也大概更近。大多数个人电脑是家电：快、封闭，按别人多年前做的决定排布，而那些决定不容易再回头改。很长一段时间这笔交易是合理的，因为另一种选择是一台你得维护而不是使用的机器。`,
      `智能体改变了这笔交易的代价。一个智能体的用处，被它能触及的界面所限；而在一台封闭的家电上，那个界面就是对话，几乎没有别的。`,
      `在我看来有两股力量正从相反的两端汇向这里。Hermes 与 MCP 把能力拆成你能检视的东西：技能是一个 Markdown 文件，工具是一个你读得懂的服务。Omarchy 从系统一侧走来，把桌面当作预期由主人编辑的配置，并自称是智能体时代的操作系统。两者之间，就是我想用的那台机器：一台能被住在里面的人${U('主动使用并塑形')}的机器。`,
      `${L('我不是从立场出发走到这一步的。')} 我在 Windows 上长大，因为那是一个 PC 玩家会有的东西。之后我在苹果内部待了十年，也就是说，用十年时间把一个不属于我的平台玩得很好。现在我在有意识地把两者都拆开：用 Arch、Fedora 和 Omarchy，逐步离开谷歌服务，读 OSINT 的资料来搞清楚这二十年我到底泄露了什么，并计划把手机换成 GrapheneOS。这个过程很慢，偶尔不方便，而我没有停下来的打算。`,
      `我这么做不是因为开源时髦。我这么做，是因为我看着那些平台对住在里面的人持续变差，而且看得足够近，近到能看见那些决定是怎么做出来的。${U('谁握着原语，谁就定下了')}机器能帮你到什么程度的天花板；在一套封闭的技术栈上，那个天花板是别人的产品路线图。开放权重与开放原语，正是让它留在主人手里的东西。`,
      `这就是我想去 Nous 工作、而不是去一家愿意付我更多钱做相反事情的公司的现实理由。如果开放推理要成为普通人和小企业的真实选项，就得有人去做那份不体面的工作——${U('把它变得可被采用')}：回答问题、把修法写下来、陪着那个人直到它跑起来。我希望那是我的工作。`,
      `${L('那么，回到第一段。')}“让强大的 AI 落到大多数人手里”这句话，迟早要经受一次具体的检验：某个真实的人，在糟糕的一天，手上还有东西要交，而他的机器出了问题。那个时候得有人在场。我申请的就是那个位置。`
    ] },
    running: { paras: [
      `${L('我是通过 OpenClaw 走进来的。')} 那是我第一个认真用起来的智能体，它完成了我交给它的活。真正改变我对这个品类看法的是遇到 Hermes——不是模型，是那套框架。技能是我能打开并编辑的 Markdown 文件，工具是我读得懂的服务。它的循环意味着配置会随着使用变好，而不是靠我每周重新调一遍。我用了几周才确信这个差别真有我想的那么重要，而事实证明我比自己预期的还要对：刚开始时我还在向人解释 Hermes 是什么，${U('而现在已经不用了')}。`,
      `早早看出哪个工具值得别人花时间，并且说得出为什么，这和看出一台机器究竟哪里坏了，几乎是同一件事。两者靠的都是拒绝接受第一个听起来说得通的解释。`
    ], runningIntro: `${L('目前在跑的')}，在我自己的机器上和一台我管理的 VPS 上：`, list: [
      `${L('每天用 Hermes')}，作为工作工具而不是演示：定时工作流、自动化，以及有权限操作真实文件的智能体。`,
      `${L('本地推理')} — llama.cpp 在这台机器的 RTX 5090 上提供一个稠密的 Qwen3 27B（GGUF，Q6），以 API 暴露并接入 Hermes。我也用过 Ollama 和 LM Studio。这个回路里的任何东西都${U('不出家门')}，而这几乎就是做它的全部意义。`,
      `${L('Omarchy')} 作为主力系统，与 Arch 和 Fedora 并用。它是上一节论点的另一半，也是我用过的第一个期待被编辑、而不是被忍受的桌面。`,
      `${L('一个小型 Web 应用')}在生产环境运行，由我用 Docker、Traefik 与 TLS 部署，前面有一道发布关卡，任何检查亮红灯就拒绝发布。这一个从头到尾都是我的。<a class="u" href="https://memento.technoir.cloud/">memento.technoir.cloud</a>`
    ], tail: [
      `${L('硬件那一半')}比软件早得多。我从少年时代就开始装机和调机——先是为了游戏，后来是为了用超频从一块零件里榨出最后那百分之几的快感；正是在那里我明白，一台机器是硅片与你要它跑的软件之间的一场谈判。这个房间里的 5090 是同一种兴趣长大后的样子。这也是为什么本地推理在我还没有任何理由支持它之前就吸引了我：我想知道自己的硬件到底能做到什么。`,
      `在苹果的十年留给我的另一样东西，是对丑陋工作的低容忍度。在那里，美观与好用从来不是对立的，我也不认为在这里是——你们自己的品牌手册把这个论点讲得比我好，而这也是这份求职页面长成这样的原因之一。`,
      `${L('还有我正在学的')}，刻意分开来说：vLLM，以及我在用 Proxmox 搭的家庭实验室——虚拟化层下面的 NAS，随之而来的虚拟化与网络，边缘上的 Pi-hole。这些我都还不会拿去卖。这是把上一节的论点放在我自己的硬件上、用我自己的钱去验证，失败了也只有我自己承担。`,
      `${L('把 GitHub 账号说清楚')}，因为你们会去看，而我宁愿自己先说。<a class="u" href="https://github.com/ponzgpt/hermes-pkm-toolkit">用于 Markdown 库的 MCP 服务器</a>和<a class="u" href="https://github.com/ponzgpt/mental-models-toolkit">三十个模型的技能包</a>由我定规格，再由 Hermes 依此写出来；设计和内容是我的，实现不是，这两个我都没法逐行讲给你们听。<a class="u" href="https://github.com/ponzgpt/aberdeen-daily">阿伯丁那份报纸</a>是一个开源 Hermes 项目的 fork，被我改到自己的城市——十七个提交里有一个是我的。我把它们留在公开状态，是因为“引导一个智能体做出可用的东西”是一项真实的能力，也正是我在练的能力；但这和“我写了它”不是同一个说法，两者不该并列在一起。`
    ] },
    contact: { head: '联系', paras: [
      '最有用的回复，是告诉我这几个方向里哪一个值得走下去，以及我距离“显然够格”还差什么。我宁愿去补一个具体的差距，也不愿去猜它在哪里。',
      '你们的招聘页面给出的条件是：长达数月的全神贯注与持续的危险，成功的话会有荣誉与光荣。那一页我读过不止一次。这笔交易我接受。'
    ],
      applyLead: '这份申请由 <a class="u" href="mailto:nerion89@gmail.com">nerion89@gmail.com</a> 寄出，以下材料已随信附上：',
      applyItems: [
        '邮件主题：Technical Support &amp; Customer Success — open application',
        '<a class="u" href="https://javierponz.technoir.cloud/javier-ponz-prado-cv.pdf">简历</a>',
        '<a class="u" href="/javier-ponz-prado-cover-letter.pdf">求职信</a>',
        '展示我作品的<a class="u" href="https://javierponz.technoir.cloud/workbench">作品集</a> · <a class="u" href="https://github.com/ponzgpt">github.com/ponzgpt</a> · <a class="u" href="https://www.linkedin.com/in/javierponz">LinkedIn</a>'
      ],
      notice: 'Life before death. Strength before weakness. Journey before destination.' }
  }
};
