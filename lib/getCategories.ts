import { supabase } from '@/lib/supabase'

type CategoryNode = {
  id: number
  parent_id: number | null
  name: string
  slug: string
  level?: number
  children: CategoryNode[]
}

export async function getCategoriesTree() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('level', { ascending: true })

  if (!data) return []

  const map = new Map<number, CategoryNode>()
  const tree: CategoryNode[] = []

  data.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] })
  })

  data.forEach((cat) => {
    if (cat.parent_id) {
      map.get(cat.parent_id)?.children.push(map.get(cat.id) as CategoryNode)
    } else {
      tree.push(map.get(cat.id) as CategoryNode)
    }
  })

  return tree
}
