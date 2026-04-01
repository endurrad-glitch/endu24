'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategoriesTree } from '@/lib/getCategories'

export default function Menu() {
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      const data = await getCategoriesTree()
      setCategories(data)
    }

    load()
  }, [])

  return (
    <nav style={{ padding: 20, borderBottom: '1px solid #eee' }}>
      <ul style={{ display: 'flex', gap: 30 }}>
        {categories.map((cat) => (
          <li key={cat.id} style={{ position: 'relative' }}>
            
            <Link href={`/categoria/${cat.slug}`}>
              <strong>{cat.name}</strong>
            </Link>

            {/* DROPDOWN */}
            {cat.children.length > 0 && (
              <ul
                style={{
                  position: 'absolute',
                  top: 30,
                  left: 0,
                  background: '#fff',
                  padding: 15,
                  border: '1px solid #eee',
                  borderRadius: 8,
                  display: 'none'
                }}
                className="submenu"
              >
                {cat.children.map((child: any) => (
                  <li key={child.id} style={{ marginBottom: 10 }}>
                    <Link href={`/categoria/${child.slug}`}>
                      {child.name}
                    </Link>

                    {/* NIPOTI */}
                    {child.children?.length > 0 && (
                      <ul style={{ marginLeft: 15 }}>
                        {child.children.map((sub: any) => (
                          <li key={sub.id}>
                            <Link href={`/categoria/${sub.slug}`}>
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}