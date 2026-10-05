import React from 'react';
import {
  AlertTriangle, BarChart3, ChevronRight, FileText, Info, Lightbulb, Link2, Mail, Package, Smartphone,
  User, Users,
} from 'lucide-react';
import { sectionsOf } from '../content/index.js';
import { Link } from '../router.jsx';

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
const LINK_PATTERN = /^\[([^\]]+)\]\(([^)]+)\)$/;

/** **negrita**, `código` y [enlaces](/ruta): el único formato en línea de la documentación. */
export function Inline({ text }) {
  return (
    <>
      {text.split(INLINE_PATTERN).map((part, index) => {
        if (!part) return null;
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="dx-code">{part.slice(1, -1)}</code>;
        }
        const link = part.match(LINK_PATTERN);
        if (link) {
          const [, label, href] = link;
          return href.startsWith('/') ? (
            <Link key={index} href={href} className="dx-link">{label}</Link>
          ) : (
            <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="dx-link">{label}</a>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

const CALLOUTS = {
  tip: { icon: Lightbulb, label: 'Consejo' },
  note: { icon: Info, label: 'Nota' },
  warning: { icon: AlertTriangle, label: 'Importante' },
};

const FLOW_ICONS = {
  person: User,
  phone: Smartphone,
  mail: Mail,
  team: Users,
  file: FileText,
  chart: BarChart3,
  stock: Package,
};

function FlowDiagram({ block }) {
  return (
    <figure className="dx-figure">
      <ol className="dx-flow">
        {block.nodes.map((node, index) => {
          const Icon = FLOW_ICONS[node.icon];
          return (
            <li key={index} className="dx-flow-node">
              <span className={`dx-flow-icon${node.icon === 'ruralit' ? ' is-brand' : ''}`}>
                {Icon ? <Icon size={20} strokeWidth={1.75} aria-hidden="true" /> : <img src="/favicon-192.png" alt="" />}
              </span>
              <span className="dx-flow-text">
                <span className="dx-flow-label">{node.label}</span>
                {node.detail && <span className="dx-flow-detail"><Inline text={node.detail} /></span>}
              </span>
            </li>
          );
        })}
      </ol>
      {block.caption && <figcaption><Inline text={block.caption} /></figcaption>}
    </figure>
  );
}

/** Una frase en el cuadro de registro rápido y lo que Ruralit entiende de ella. */
function PhraseExample({ block }) {
  return (
    <figure className="dx-figure dx-phrase">
      <div className="dx-phrase-input">
        <span className="dx-phrase-prompt">¿Qué pasó hoy?</span>
        <span className="dx-phrase-text">{block.text}</span>
      </div>
      <div className="dx-phrase-arrow" aria-hidden="true">
        <ChevronRight size={14} strokeWidth={2.25} />
        Vista previa
      </div>
      <dl className="dx-phrase-fields">
        {block.fields.map(field => (
          <div key={field.label} className="dx-phrase-field">
            <dt>{field.label}</dt>
            <dd><Inline text={field.value} /></dd>
          </div>
        ))}
      </dl>
      {block.caption && <figcaption><Inline text={block.caption} /></figcaption>}
    </figure>
  );
}

function Block({ block, id }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 id={id} className="dx-h2">
          <a href={`#${id}`} className="dx-anchor" aria-label={`Enlace a ${block.text}`}>
            <Link2 size={15} aria-hidden="true" />
          </a>
          <Inline text={block.text} />
        </h2>
      );
    case 'h3':
      return <h3 className="dx-h3"><Inline text={block.text} /></h3>;
    case 'p':
      return <p className="dx-p"><Inline text={block.text} /></p>;
    case 'steps':
      return (
        <ol className="dx-steps">
          {block.items.map((item, index) => (
            <li key={index}>
              <span className="dx-step-num" aria-hidden="true">{index + 1}</span>
              <span><Inline text={item} /></span>
            </li>
          ))}
        </ol>
      );
    case 'list':
      return (
        <ul className="dx-list">
          {block.items.map((item, index) => <li key={index}><Inline text={item} /></li>)}
        </ul>
      );
    case 'callout': {
      const { icon: Icon, label } = CALLOUTS[block.tone];
      return (
        <aside className={`dx-callout is-${block.tone}`}>
          <Icon size={17} strokeWidth={2} aria-hidden="true" className="dx-callout-icon" />
          <div>
            <p className="dx-callout-label">{block.title ?? label}</p>
            <p className="dx-callout-text"><Inline text={block.text} /></p>
          </div>
        </aside>
      );
    }
    case 'path':
      return (
        <p className="dx-path" aria-label={`Ruta en la app: ${block.steps.join(', ')}`}>
          {block.steps.map((step, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight size={14} aria-hidden="true" className="dx-path-sep" />}
              <span className="dx-path-step">{step}</span>
            </React.Fragment>
          ))}
        </p>
      );
    case 'table':
      return (
        <div className="dx-table-wrap">
          <table className="dx-table">
            <thead>
              <tr>{block.head.map((cell, index) => <th key={index} scope="col">{cell}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} data-label={block.head[cellIndex]}><Inline text={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'flow':
      return <FlowDiagram block={block} />;
    case 'phrase':
      return <PhraseExample block={block} />;
    default:
      return null;
  }
}

/** El cuerpo de un artículo. Los ids de los `h2` salen de `sectionsOf`, igual que en el buscador. */
export function DocContent({ article }) {
  return (
    <>
      {sectionsOf(article).map(section => (
        <section key={section.id ?? 'intro'} className="dx-section">
          {section.blocks.map((block, index) => (
            <Block key={index} block={block} id={block.type === 'h2' ? section.id : undefined} />
          ))}
        </section>
      ))}
    </>
  );
}
