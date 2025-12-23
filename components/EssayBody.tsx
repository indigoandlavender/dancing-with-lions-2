'use client'

interface EssayBodyProps {
  content: string
}

export default function EssayBody({ content }: EssayBodyProps) {
  // Parse content into blocks
  // !!! = full bleed image
  // ! = contained image
  // > = blockquote
  // Regular text = paragraphs
  
  const blocks = content.split('\n\n').map((block, index) => {
    const trimmed = block.trim()
    
    // Full bleed image: !!![caption](url)
    if (trimmed.startsWith('!!!')) {
      const match = trimmed.match(/!!!\[([^\]]*)\]\(([^)]+)\)/)
      if (match) {
        return (
          <figure key={index} className="full-bleed-image">
            <div className="w-full h-[70vh] bg-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
            </div>
            {match[1] && (
              <figcaption>{match[1]}</figcaption>
            )}
          </figure>
        )
      }
    }
    
    // Contained image: ![caption](url)
    if (trimmed.startsWith('![')) {
      const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      if (match) {
        return (
          <figure key={index} className="contained-image">
            <div className="w-full aspect-[4/3] bg-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
            </div>
            {match[1] && (
              <figcaption>{match[1]}</figcaption>
            )}
          </figure>
        )
      }
    }
    
    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteText = trimmed.replace(/^>\s*/, '')
      return (
        <blockquote key={index}>
          {quoteText}
        </blockquote>
      )
    }
    
    // Regular paragraph
    if (trimmed) {
      return (
        <p key={index}>{trimmed}</p>
      )
    }
    
    return null
  }).filter(Boolean)

  return (
    <div className="essay-content">
      {blocks}
    </div>
  )
}
