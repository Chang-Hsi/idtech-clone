import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

const renderInlineMarkdown = (text) => {
  const segments = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return segments.map((segment, index) => {
    const match = segment.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!match) return <span key={`${segment}-${index}`}>{segment}</span>
    const [, label, url] = match
    return (
      <a key={`${label}-${index}`} href={url} target="_blank" rel="noreferrer">
        {label}
      </a>
    )
  })
}

const renderMarkdown = (markdown) => {
  if (!markdown) return null

  const lines = markdown.split('\n')
  const nodes = []
  let paragraph = []
  let listItems = []
  let tableLines = []
  let codeFence = null

  const flushParagraph = (lineIndex) => {
    if (!paragraph.length) return
    const text = paragraph.join(' ').trim()
    if (text) {
      nodes.push(<p key={`p-${lineIndex}`}>{renderInlineMarkdown(text)}</p>)
    }
    paragraph = []
  }

  const flushList = (lineIndex) => {
    if (!listItems.length) return
    nodes.push(
      <ul key={`ul-${lineIndex}`}>
        {listItems.map((item, idx) => (
          <li key={`li-${lineIndex}-${idx}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>,
    )
    listItems = []
  }

  const flushCodeBlock = (lineIndex) => {
    if (!codeFence) return
    nodes.push(
      <pre key={`pre-${lineIndex}`} className="md-code-block overflow-x-auto">
        <code>{codeFence.lines.join('\n')}</code>
      </pre>,
    )
    codeFence = null
  }

  const isTableLine = (line) => line.includes('|')

  const parseTableRow = (line) => {
    const cells = line.split('|').map((cell) => cell.trim())
    if (cells[0] === '') cells.shift()
    if (cells[cells.length - 1] === '') cells.pop()
    return cells
  }

  const isTableSeparator = (line) => {
    const cells = parseTableRow(line)
    if (!cells.length) return false
    return cells.every((cell) => /^:?-{2,}:?$/.test(cell))
  }

  const flushTable = (lineIndex) => {
    if (tableLines.length < 2 || !isTableSeparator(tableLines[1])) {
      tableLines.forEach((line) => paragraph.push(line))
      tableLines = []
      return
    }

    const headers = parseTableRow(tableLines[0])
    const bodyRows = tableLines.slice(2).map(parseTableRow).filter((row) => row.length)

    nodes.push(
      <div key={`table-wrap-${lineIndex}`} className="overflow-x-auto">
        <table key={`table-${lineIndex}`} className="md-table w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={`th-${lineIndex}-${idx}`}>{renderInlineMarkdown(header)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIdx) => (
              <tr key={`tr-${lineIndex}-${rowIdx}`}>
                {row.map((cell, cellIdx) => (
                  <td key={`td-${lineIndex}-${rowIdx}-${cellIdx}`}>{renderInlineMarkdown(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    )
    tableLines = []
  }

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim()

    if (codeFence) {
      if (line.startsWith('```')) {
        flushCodeBlock(index)
      } else {
        codeFence.lines.push(rawLine)
      }
      return
    }

    if (!line) {
      flushTable(index)
      flushParagraph(index)
      flushList(index)
      return
    }

    if (isTableLine(line)) {
      flushParagraph(index)
      flushList(index)
      tableLines.push(line)
      return
    }

    flushTable(index)

    if (line.startsWith('```')) {
      flushParagraph(index)
      flushList(index)
      codeFence = { lines: [] }
      return
    }

    if (line.startsWith('## ')) {
      flushParagraph(index)
      flushList(index)
      nodes.push(<h2 key={`h2-${index}`}>{line.slice(3)}</h2>)
      return
    }

    if (line.startsWith('# ')) {
      flushParagraph(index)
      flushList(index)
      nodes.push(<h1 key={`h1-${index}`}>{line.slice(2)}</h1>)
      return
    }

    if (line.startsWith('- ')) {
      flushParagraph(index)
      listItems.push(line.slice(2))
      return
    }

    flushList(index)
    paragraph.push(line)
  })

  flushTable(lines.length)
  flushParagraph(lines.length)
  flushList(lines.length)
  flushCodeBlock(lines.length)
  return nodes
}

const ResourceArticleContentSection = ({
  article,
  translation,
  lang,
  onChangeLang,
  prevArticle,
  nextArticle,
}) => {
  const sourceLabel = lang === 'zh' ? '資料來源：' : 'Source:'
  const rightsNotice =
    typeof article.rightsNotice === 'string'
      ? article.rightsNotice
      : article.rightsNotice?.[lang] ?? article.rightsNotice?.zh ?? null
  const prevLabel = lang === 'zh' ? '上一頁' : 'Prev'
  const nextLabel = lang === 'zh' ? '下一頁' : 'Next'

  return (
    <section className="bg-white py-12 text-black md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mx-auto w-full max-w-[760px]">
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[0.78rem] tracking-[0.06em] text-black/45">{article.publishedAt}</p>
            <div className="inline-flex overflow-hidden rounded border border-black/10">
              <button
                type="button"
                onClick={() => onChangeLang?.('zh')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  lang === 'zh' ? 'bg-black text-white' : 'bg-white text-black/70 hover:bg-black/5'
                }`}
              >
                中文
              </button>
              <button
                type="button"
                onClick={() => onChangeLang?.('en')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  lang === 'en' ? 'bg-black text-white' : 'bg-white text-black/70 hover:bg-black/5'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {article.source ? (
            <div className="my-6 rounded-sm border border-black/8 bg-black/[0.03] p-4 text-xs text-black/60">
              <p>
                {sourceLabel}
                <a
                  href={article.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 text-emerald-700 hover:underline"
                >
                  {article.source.siteName} - {article.source.title}
                </a>
              </p>
              {rightsNotice ? <p className="mt-2 text-black/50">{rightsNotice}</p> : null}
            </div>
          ) : null}

          <div className="md-prose mt-8">{renderMarkdown(translation?.contentMarkdown)}</div>

          <div className="mt-14 border-t border-black/10 py-5">
            <div className="flex items-center justify-between gap-4">
              {prevArticle ? (
                <Link to={prevArticle.href} className="group inline-flex items-center gap-2 text-black/70">
                  <ChevronLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                  <span className="text-sm font-semibold">{prevLabel}</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-black/30">
                  <ChevronLeftIcon className="h-4 w-4" />
                  {prevLabel}
                </span>
              )}

              {nextArticle ? (
                <Link to={nextArticle.href} className="group inline-flex items-center gap-2 text-black/70">
                  <span className="text-sm font-semibold">{nextLabel}</span>
                  <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-black/30">
                  {nextLabel}
                  <ChevronRightIcon className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourceArticleContentSection
