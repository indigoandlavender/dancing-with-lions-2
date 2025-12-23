'use client'

import Image from 'next/image'

interface EssayBodyProps {
  content: string
}

interface Segment {
  type: 'paragraph' | 'heading' | 'blockquote' | 'full-bleed-image' | 'contained-image'
  content?: string
  src?: string
  caption?: string
}

function parseContent(content: string): Segment[] {
  const lines = content.split('\n')
  const segments: Segment[] = []
  let currentParagraph = ''

  const flushParagraph = () => {
    if (currentParagraph.trim()) {
      segments.push({
        type: 'paragraph',
        content: currentParagraph.trim(),
      })
      currentParagraph = ''
    }
  }

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushParagraph()
      continue
    }

    if (trimmedLine.startsWith('## ')) {
      flushParagraph()
      segments.push({
        type: 'heading',
        content: trimmedLine.slice(3),
      })
      continue
    }

    if (trimmedLine.startsWith('> ')) {
      flushParagraph()
      segments.push({
        type: 'blockquote',
        content: trimmedLine.slice(2),
      })
      continue
    }

    const fullBleedMatch = trimmedLine.match(/^!!!\[([^\]]*)\]\(([^)]+)\)$/)
    if (fullBleedMatch) {
      flushParagraph()
      segments.push({
        type: 'full-bleed-image',
        caption: fullBleedMatch[1],
        src: fullBleedMatch[2],
      })
      continue
    }

    const containedMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (containedMatch) {
      flushParagraph()
      segments.push({
        type: 'contained-image',
        caption: containedMatch[1],
        src: containedMatch[2],
      })
      continue
    }

    currentParagraph += (currentParagraph ? ' ' : '') + trimmedLine
  }

  flushParagraph()
  return segments
}

export default function EssayBody({ content }: EssayBodyProps) {
  const segments = parseContent(content)

  return (
    <div className="essay-content">
      {segments.map((segment, index) => {
        if (segment.type === 'paragraph') {
          return <p key={index} dangerouslySetInnerHTML={{ __html: segment.content || '' }} />
        }
        
        if (segment.type === 'heading') {
          return <h2 key={index}>{segment.content}</h2>
        }
        
        if (segment.type === 'blockquote') {
          return <blockquote key={index}>{segment.content}</blockquote>
        }
        
        if (segment.type === 'full-bleed-image') {
          return (
            <figure key={index} className="full-bleed-image">
              <div className="relative w-full h-[70vh]">
                <Image
                  src={segment.src || ''}
                  alt={segment.caption || ''}
                  fill
                  className="object-cover"
                />
              </div>
              {segment.caption && <figcaption>{segment.caption}</figcaption>}
            </figure>
          )
        }
        
        if (segment.type === 'contained-image') {
          return (
            <figure key={index} className="contained-image">
              <div className="relative w-full aspect-[4/3]">
                <Image
                  src={segment.src || ''}
                  alt={segment.caption || ''}
                  fill
                  className="object-cover"
                />
              </div>
              {segment.caption && <figcaption>{segment.caption}</figcaption>}
            </figure>
          )
        }
        
        return null
      })}
    </div>
  )
}
