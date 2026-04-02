import Link from 'next/link'

type MenuItem = {
  id: string
  label: string
  url: string
  sort_order: number
  is_active: boolean
}

type Node = MenuItem & { children: Node[] }

function buildTree(items: MenuItem[]): Node[] {
  const roots = new Map<string, Node>()

  items.forEach((item) => {
    const segments = item.url.split('/').filter(Boolean)
    const rootKey = segments[0] ?? item.id
    if (!roots.has(rootKey)) {
      roots.set(rootKey, { ...item, id: rootKey, children: [] })
    }

    if (segments.length > 1) {
      const root = roots.get(rootKey)
      if (!root) return

      let parent = root
      for (let i = 1; i < Math.min(segments.length, 3); i++) {
        const key = `${rootKey}/${segments[i]}`
        const existing = parent.children.find((child) => child.id === key)
        if (existing) {
          parent = existing
          continue
        }

        const segmentLabel = segments[i] ?? ''
        const child: Node = {
          ...item,
          id: key,
          label: segmentLabel.replace(/-/g, ' '),
          url: `/${segments.slice(0, i + 1).join('/')}`,
          children: [],
        }
        parent.children.push(child)
        parent = child
      }
    }
  })

  return [...roots.values()]
}

export function MegaMenu({ items }: { items: MenuItem[] }) {
  const tree = buildTree(items)

  return (
    <nav className="border-y border-[#2b2b2b]/10 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3">
        {tree.map((root) => (
          <div key={root.id} className="group relative shrink-0">
            <Link href={root.url} className="text-sm font-medium text-[#2b2b2b] hover:text-[#2b2b2b]">
              {root.label}
            </Link>
            {root.children.length > 0 ? (
              <div className="invisible absolute left-0 top-full z-40 mt-3 grid min-w-[560px] grid-cols-3 gap-4 rounded-2xl border border-[#2b2b2b]/10 bg-white p-5 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                {root.children.map((child) => (
                  <div key={child.id}>
                    <Link className="font-medium hover:underline" href={child.url}>
                      {child.label}
                    </Link>
                    {child.children.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {child.children.map((sub) => (
                          <li key={sub.id}>
                            <Link className="text-sm text-[#2b2b2b]/70 hover:text-[#2b2b2b]" href={sub.url}>
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </nav>
  )
}
