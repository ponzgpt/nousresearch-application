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
    nav: ['Who', 'What', 'Built', 'Why', 'Where', 'When'],
    block: 'APPLICATION',
    portraitAlt: 'Pencil-sketch portrait of Javier Ponz',
    application: {
      mission: `${L('My mission')} is the same one on your careers page, read from the support side instead of the research side: powerful AI only reaches the many if somebody is willing to sit with the ones who do not yet know how to use it. Open weights solve the access problem in theory. They do not solve it in practice, because a model sitting on a hard drive is not the same thing as a model a person can actually put to work — that gap only closes with explanation, patience, and somebody willing to stay on the problem until it runs. I spent ten years being exactly that person for people and their machines, long before I had a name for it. That is not a coincidence of phrasing. It is the reason I am writing this page instead of a different one.`
    },
    who: { head: 'Who', sub: '— am I?', paras: [
      `${L('Hi! I\'m <a href="https://javierponz.technoir.cloud/">Javier Ponz</a>')}, an ex-Apple Genius from Madrid, Spain — now learning and building AI from Aberdeen, Scotland. Your careers page says that if nothing listed fits, send a description of what I would like to do here. This page is that description.`,
      `Twice within those ten years, seven months at a time, I stepped away from the bench to run store floor operations — planning, resourcing, events, the situations that fit no procedure. Both secondments left me with the same conviction: ${U('leading is serving')}. The job was never being the most capable person in the room. It was making the room work.`
    ] },
    what: { head: 'What', sub: '— what I would love to do at Nous', roles: [
      { badge: 'Proven', title: 'Technical problem-solving', body: 'Ten years diagnosing problems that rarely arrived in clean technical form — translating between what the engineer means, what the sale promised, and what is really on the screen. That translation work is what I have actually proven, over and over, not any single stack.' },
      { badge: 'Moonshot', title: 'Forward-deployed engineering', body: 'The role that has my attention right now. I am two years into rebuilding my technical foundation around this stack, and I will not pretend that is the same as years spent shipping production software — it is not. But the gap is a known distance, not a wall, and I am closing it deliberately.' },
      { badge: 'The bridge', title: 'What closes the gap between the two', body: 'Carrying real support load, writing the fix down, staying with a problem until it runs. That is how technical problem-solving turns into FDE readiness, not a separate track from it.' }
    ] },
    built: { head: 'Built', sub: '— the evidence, briefly', paras: [
      `Everything above is easier to believe with something to point at. My <a class="u" href="https://javierponz.technoir.cloud/workbench">Workbench</a> has the rest: Memento Mori running in production on my own infrastructure, the MCP tooling I have specified and shipped, and what I run day to day. I would rather you look than take my word for it.`
    ] },
    why: { head: 'Why', sub: '— why Nous, and why not the others', paras: [
      `${L('An operating system')} malleable enough for an agent to inhabit strikes me as a more interesting problem than a larger model, and probably a nearer one. Most personal computers are appliances: sealed, arranged by decisions somebody else made years ago. Agents change what that costs — an agent's usefulness is bounded by the surface it can reach, and on a sealed appliance that surface is conversation and little else.`,
      `Hermes and MCP decompose capability into things you can inspect: a skill is a Markdown file, a tool is a server you can read. Omarchy approaches from the system side, treating the desktop as configuration its owner is expected to edit. Between them sits the machine I want to use — one that is ${U('proactive and shapeable')} by the person living in it, which is the same idea your mission statement opens with, read from the operating-system layer instead of the model layer.`,
      `${L('I did not arrive here from ideology.')} I grew up on Windows, spent a decade very good at a platform I did not own, and I am now deliberately unwinding that: Arch, Fedora and Omarchy, off Google services, learning OSINT, GrapheneOS next. I watched those platforms get steadily worse for the people living inside them, closely enough to see the decisions being made. ${U('Whoever holds the primitives sets the ceiling')} on how far a machine may help you, and open weights are what keep that ceiling in the owner's hands.`,
      `That is the practical reason I want to work at Nous rather than somewhere that would pay me more to do the opposite. If open inference is going to be a real option for ordinary people, somebody has to do the unglamorous work of ${U('making it adoptable')}. ${L('So, back to the first paragraph.')} Powerful AI in the hands of the many is a sentence that eventually has to survive contact with one real person's machine, on a bad day, with something already due. Somebody has to be there when it does. That is the job I am asking for.`
    ] },
    where: { head: 'Where', sub: '— based, and how far I will go', paras: [
      `${L('Aberdeen, Scotland')} — by way of Madrid. That is where the machines described on this page physically sit.`,
      `UK-based, remote-ready, and happy to travel to meet the team, conferences or customers wherever Nous needs somebody ${U('in the room')} rather than on a call.`
    ] },
    when: { head: 'When', sub: '— availability', paras: [
      `${L('I can start immediately.')} There is no notice period to work through and no employer to leave gracefully. The consultancy is mine, which makes it the thing I would be setting aside rather than the thing I would be leaving. If the fit is right, the honest answer to when is ${U('whenever you want me')}.`,
      `${L('I know how fortunate that makes me.')} Running my own consultancy these last two years has meant I could spend real time studying and experimenting instead of only shipping billable work — most of what is on this page came out of hours nobody was paying me for. I would bring Nous that same appetite, and give the work whatever time it actually needs.`,
      `I work from UK time: a full working day of overlap with Europe, and most of an afternoon with the American east coast. Ten years of retail and support ran on shifts rather than office hours, so ${U('moving my day')} to meet a team spread across time zones is a scheduling question and not an objection.`,
      `${L('I would also weigh every path Nous offers for growth')} — relocation included — if the fit and the time zones line up. That is not a demand. It is an openness I would rather state now than discover later.`
    ] },
    contact: { head: 'Contact', paras: [
      'The most useful reply would tell me which of these directions is worth pursuing and what stands between me and being obviously qualified for it. I would rather close a specific gap than guess at one.',
      'Your careers page offers long months of complete focus and constant danger, with honor and glory in the event of success. I have read that page more than once. I would take the trade.',
      'None of this needs to be settled on the page. Give me something real to look at, and you will see how I actually work faster than any paragraph here could show you.'
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
    nav: ['Quién', 'Qué', 'Hecho', 'Por qué', 'Dónde', 'Cuándo'],
    block: 'CANDIDATURA',
    portraitAlt: 'Retrato a lápiz de Javier Ponz',
    application: {
      mission: `${L('Mi misión')} es la misma que aparece en vuestra página de empleo, leída desde el lado del soporte y no desde el de la investigación: la IA potente solo llega a la mayoría si alguien está dispuesto a sentarse con quienes todavía no saben usarla. Los pesos abiertos resuelven el problema del acceso en la teoría. No lo resuelven en la práctica, porque un modelo guardado en un disco duro no es lo mismo que un modelo que una persona pueda poner a trabajar de verdad: esa distancia solo se cierra con explicación, paciencia y alguien dispuesto a quedarse con el problema hasta que funcione. Pasé diez años siendo exactamente esa persona para la gente y sus máquinas, mucho antes de tener un nombre para ello. No es una coincidencia de redacción. Es la razón por la que estoy escribiendo esta página y no otra.`
    },
    who: { head: 'Quién', sub: '— soy?', paras: [
      `${L('¡Hola! Soy <a href="https://javierponz.technoir.cloud/">Javier Ponz</a>')}, ex-Genius de Apple de Madrid, España — ahora aprendiendo y construyendo IA desde Aberdeen, Escocia. Vuestra página de empleo dice que, si nada de lo publicado encaja, envíe una descripción de lo que me gustaría hacer ahí. Esta página es esa descripción.`,
      `Dos veces, dentro de esos diez años, siete meses cada vez, dejé el banco de trabajo para dirigir la experiencia de sala de la tienda: planificación, recursos, eventos, las situaciones que no encajan en ningún procedimiento. De ambas comisiones salió la misma convicción: ${U('liderar es servir')}. El trabajo nunca fue ser la persona más capaz de la sala. Era hacer que la sala funcionara.`
    ] },
    what: { head: 'Qué', sub: '— me encantaría hacer en Nous', roles: [
      { badge: 'Demostrado', title: 'Resolución técnica de problemas', body: 'Diez años diagnosticando problemas que casi nunca llegaban en forma técnica limpia: traducir entre lo que quiere decir el ingeniero, lo que prometió la venta y lo que hay de verdad en la pantalla. Ese trabajo de traducción es lo que tengo demostrado, una y otra vez, no una pila concreta.' },
      { badge: 'Meta lejana', title: 'Ingeniería desplegada en cliente', body: 'El puesto que tiene ahora mismo toda mi atención. Llevo dos años reconstruyendo mi base técnica alrededor de esta pila, y no voy a fingir que eso es lo mismo que años entregando software en producción: no lo es. Pero la distancia es medible, no un muro, y la estoy cerrando a propósito.' },
      { badge: 'El puente', title: 'Lo que cierra la distancia entre las dos', body: 'Asumir carga real de soporte, dejar el arreglo por escrito, quedarme con un problema hasta que funcione. Así es como la resolución técnica de problemas se convierte en estar listo para FDE, no una vía aparte.' }
    ] },
    built: { head: 'Hecho', sub: '— la prueba, en breve', paras: [
      `Todo lo anterior es más fácil de creer si hay algo que señalar. Mi <a class="u" href="https://javierponz.technoir.cloud/workbench">Workbench</a> tiene el resto: Memento Mori funcionando en producción sobre mi propia infraestructura, las herramientas MCP que he especificado y publicado, y lo que tengo funcionando a diario. Prefiero que lo miréis a que me creáis sin más.`
    ] },
    why: { head: 'Por qué', sub: '— por qué Nous, y por qué no los demás', paras: [
      `${L('Un sistema operativo')} lo bastante moldeable como para que un agente pueda habitarlo me parece un problema más interesante que un modelo más grande, y probablemente más cercano. La mayoría de los ordenadores personales son electrodomésticos: sellados, ordenados según decisiones que tomó otro hace años. Los agentes cambian lo que cuesta ese trato: la utilidad de un agente está limitada por la superficie que alcanza, y en un aparato sellado esa superficie es la conversación y poco más.`,
      `Hermes y MCP descomponen la capacidad en cosas que puedes inspeccionar: una habilidad es un fichero Markdown, una herramienta es un servidor que puedes leer. Omarchy llega por el lado del sistema, tratando el escritorio como configuración que se espera que su dueño edite. Entre los dos está la máquina que quiero usar: una que sea ${U('proactiva y moldeable')} por quien vive dentro de ella, que es la misma idea con la que abre vuestra declaración de misión, leída desde la capa del sistema operativo en vez de la del modelo.`,
      `${L('No he llegado aquí por ideología.')} Crecí con Windows, pasé una década siendo muy bueno en una plataforma que no era mía, y ahora estoy desmontando eso a propósito: Arch, Fedora y Omarchy, fuera de los servicios de Google, aprendiendo OSINT, y GrapheneOS como siguiente paso. Vi cómo esas plataformas empeoraban de forma sostenida para quienes vivían dentro, y lo vi desde lo bastante cerca como para ver cómo se tomaban las decisiones. ${U('Quien tiene los primitivos pone el techo')} de hasta dónde puede ayudarte una máquina, y los pesos abiertos son lo que mantiene ese techo en manos del dueño.`,
      `Esa es la razón práctica por la que quiero trabajar en Nous y no en un sitio que me pagaría más por hacer lo contrario. Si la inferencia abierta va a ser una opción real para gente corriente, alguien tiene que hacer el trabajo poco lucido de ${U('volverla adoptable')}. ${L('Y así volvemos al primer párrafo.')} Que la IA potente esté en manos de la mayoría es una frase que, tarde o temprano, tiene que sobrevivir al contacto con el ordenador de una persona concreta, en un mal día y con algo que entregar. Alguien tiene que estar ahí cuando pase. Ese es el puesto que pido.`
    ] },
    where: { head: 'Dónde', sub: '— y hasta dónde llego', paras: [
      `${L('Aberdeen, Escocia')} — pasando por Madrid. Ahí es donde están, físicamente, las máquinas de las que habla esta página.`,
      `Con base en el Reino Unido, montado para el remoto, y encantado de viajar para conocer al equipo, a congresos o a clientes allí donde Nous necesite a alguien ${U('en la sala')} y no al otro lado de una llamada.`
    ] },
    when: { head: 'Cuándo', sub: '— disponibilidad', paras: [
      `${L('Puedo empezar de inmediato.')} No hay preaviso que cumplir ni empresa a la que dejar con elegancia. La consultora es mía, lo que la convierte en lo que apartaría, no en lo que dejaría atrás. Si encajo, la respuesta honesta a cuándo es ${U('cuando queráis')}.`,
      `${L('Sé la suerte que tengo.')} Llevar mi propia consultora estos dos últimos años me ha dejado dedicar tiempo de verdad a estudiar y experimentar, no solo a entregar trabajo facturable: la mayor parte de lo que hay en esta página salió de horas que nadie me pagaba. Le daría a Nous ese mismo apetito, y el tiempo que el trabajo pida de verdad.`,
      `Trabajo en horario del Reino Unido: una jornada entera de solape con Europa y buena parte de una tarde con la costa este de Estados Unidos. Diez años de tienda y de soporte fueron por turnos y no por horario de oficina, así que ${U('mover mi día')} para coincidir con un equipo repartido por husos horarios es una cuestión de calendario y no una objeción.`,
      `${L('También valoraría cualquier vía de crecimiento que Nous ofrezca')} — mudanza incluida — si encajan el puesto y los husos horarios. No es una exigencia. Es una apertura que prefiero decir ahora a descubrir más tarde.`
    ] },
    contact: { head: 'Contacto', paras: [
      'La respuesta más útil sería decirme cuál de estas direcciones merece la pena y qué me separa de estar claramente cualificado para ella. Prefiero cerrar una distancia concreta que adivinar cuál es.',
      'Vuestra página de empleo ofrece largos meses de concentración absoluta y peligro constante, con honor y gloria en caso de éxito. He leído esa página más de una vez. Aceptaría el trato.',
      'Nada de esto necesita resolverse en esta página. Dadme algo real que mirar, y veréis cómo trabajo de verdad más rápido de lo que cualquier párrafo de aquí podría mostraros.'
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
    nav: ['谁', '做什么', '成果', '为什么', '何地', '何时'],
    block: '自荐信',
    portraitAlt: 'Javier Ponz 的铅笔素描肖像',
    application: {
      mission: `${L('我的使命')}和你们招聘页面上写的是同一件事，只是从支持这一端而不是研究这一端去读它：强大的 AI 只有在有人愿意坐下来陪那些还不会用它的人的时候，才会真正到达大多数人手里。开放权重在理论上解决了“获取”这个问题，但在实践中并没有解决它，因为存在硬盘里的模型，和一个人真正能用起来的模型，是两回事——这中间的距离，只能靠讲解、耐心，以及有人愿意陪着这个问题直到它跑通来填补。我用了十年时间，在还没有一个名字来形容这件事之前，就一直在为人和他们的机器扮演这个角色。这不是措辞上的巧合。这就是我在写这一页，而不是别的什么页面的原因。`
    },
    who: { head: '谁', sub: '— 是我？', paras: [
      `${L('你好！我是<a href="https://javierponz.technoir.cloud/">Javier Ponz</a>')}，来自西班牙马德里的前苹果 Genius——现在在苏格兰阿伯丁学习并构建 AI。你们的招聘页面写着：如果列出的岗位都不合适，就寄一份“我想在这里做什么”的说明。这一页就是那份说明。`,
      `在那十年里，我有两次、每次七个月，离开工作台去负责门店的卖场体验：规划、排班、活动，以及那些不符合任何流程的状况。两段借调得出的是同一个信念：${U('领导即服务')}。这份工作从来不是要成为房间里最有能力的人，而是让整个房间运转起来。`
    ] },
    what: { head: '做什么', sub: '— 我很想在 Nous 做的事', roles: [
      { badge: '已证明', title: '技术问题解决', body: '十年时间，处理那些很少以干净技术形式出现的问题——在工程师的意思、销售的承诺和屏幕上真正显示的东西之间做翻译。这份翻译工作，而不是某一套具体的技术栈，才是我反复证明过的东西。' },
      { badge: '登月计划', title: '前置部署工程（FDE）', body: '这是现在最吸引我的岗位。这两年我一直在围绕这套技术栈重建自己的技术底子，我不会假装这等同于多年交付生产软件的经验——它不是。但这段差距是一段能被量化的距离，不是一堵墙，我在有计划地缩短它。' },
      { badge: '桥梁', title: '把两者连起来的东西', body: '承担真实的支持负荷，把修法写下来，陪着一个问题直到它跑通。这就是技术问题解决如何变成对 FDE 的准备，而不是另一条单独的路。' }
    ] },
    built: { head: '成果', sub: '— 简短的证据', paras: [
      `上面说的这些，有东西可以指给你们看会更容易让人相信。我的<a class="u" href="https://javierponz.technoir.cloud/workbench">Workbench</a>里有其余的部分：在我自己的基础设施上运行于生产环境的 Memento Mori、我定规格并发布的 MCP 工具，以及我每天在跑的东西。比起听我说，我更希望你们自己去看。`
    ] },
    why: { head: '为什么', sub: '— 为什么是 Nous，而不是别家', paras: [
      `${L('一个操作系统')}，可塑到足以让智能体住进去——在我看来这比更大的模型更有意思，也大概更近。大多数个人电脑是家电：封闭，按别人多年前做的决定排布。智能体改变了这笔交易的代价：一个智能体的用处，被它能触及的界面所限，而在一台封闭的家电上，那个界面就是对话，几乎没有别的。`,
      `Hermes 与 MCP 把能力拆成你能检视的东西：技能是一个 Markdown 文件，工具是一个你读得懂的服务。Omarchy 从系统一侧走来，把桌面当作预期由主人编辑的配置。两者之间，就是我想用的那台机器：一台能被住在里面的人${U('主动使用并塑形')}的机器——这和你们使命声明开篇的想法是同一个，只是从操作系统这一层去读，而不是从模型那一层。`,
      `${L('我不是从立场出发走到这一步的。')}我在 Windows 上长大，用十年时间把一个不属于我的平台玩得很好，现在我在有意识地把它拆开：用 Arch、Fedora 和 Omarchy，离开谷歌服务，学习 OSINT，下一步是 GrapheneOS。我看着那些平台对住在里面的人持续变差，看得足够近，近到能看见那些决定是怎么做出来的。${U('谁握着原语，谁就定下了')}机器能帮你到什么程度的天花板，开放权重正是让这个天花板留在主人手里的东西。`,
      `这就是我想去 Nous 工作、而不是去一家愿意付我更多钱做相反事情的公司的现实理由。如果开放推理要成为普通人的真实选项，就得有人去做那份不体面的工作——${U('把它变得可被采用')}。${L('那么，回到第一段。')}“让强大的 AI 落到大多数人手里”这句话，迟早要经受一次具体的检验：某个真实的人，在糟糕的一天，手上还有东西要交，而他的机器出了问题。那个时候得有人在场。我申请的就是那个位置。`
    ] },
    where: { head: '何地', sub: '— 以及我愿意走多远', paras: [
      `${L('苏格兰阿伯丁')}——途经马德里。这一页里提到的那些机器，就放在那里。`,
      `常驻英国，已经为远程工作做好准备，也乐意出差去见团队、参加会议或拜访客户，只要 Nous 需要有人${U('在现场')}而不是在通话的另一端。`
    ] },
    when: { head: '何时', sub: '— 到岗时间', paras: [
      `${L('我可以马上开始。')}没有需要走完的通知期，也没有需要体面告别的雇主。那家咨询工作室是我自己的，所以它是我会先放下的东西，而不是我要离开的东西。如果合适，关于“何时”最诚实的回答就是${U('你们想让我什么时候来都行')}。`,
      `${L('我知道自己有多幸运。')}这两年经营自己的咨询工作室，让我能把真正的时间花在学习和实验上，而不只是交付按小时计费的工作——这一页上的大部分内容，都来自没人为之付钱的那些时间。我会把同样的这股劲头带给 Nous，把工作实际需要的时间全部给它。`,
      `我按英国时间工作：与欧洲有一整个工作日的重叠，与美国东岸有大半个下午。我做了十年零售与支持，靠的是排班而不是朝九晚五，所以为了配合分布在不同时区的团队而${U('挪动我的作息')}，是排班问题，不是反对意见。`,
      `${L('我也会认真考虑 Nous 提供的任何成长路径')}——包括搬迁——只要岗位和时区都合适。这不是一个要求，而是我宁愿现在说清楚、也不愿以后才发现的一种开放态度。`
    ] },
    contact: { head: '联系', paras: [
      '最有用的回复，是告诉我这几个方向里哪一个值得走下去，以及我距离“显然够格”还差什么。我宁愿去补一个具体的差距，也不愿去猜它在哪里。',
      '你们的招聘页面给出的条件是：长达数月的全神贯注与持续的危险，成功的话会有荣誉与光荣。那一页我读过不止一次。这笔交易我接受。',
      '这些都不需要在这一页上定论。给我一件真实的事情看看，你们会比读这里任何一段文字都更快地看清我到底是怎么做事的。'
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
