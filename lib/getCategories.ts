import { supabase } from '@/lib/supabase'

export async function getCategoriesTree() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('level', { ascending: true })

  if (!data) return []

  const map = new Map()
  const tree: any[] = []

  // crea mappa
  data.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] })
  })

  // costruisci albero
  data.forEach((cat) => {
    if (cat.parent_id) {
      map.get(cat.parent_id)?.children.push(map.get(cat.id))
    } else {
      tree.push(map.get(cat.id))
    }
  })

  return tree
}